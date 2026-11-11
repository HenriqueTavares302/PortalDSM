import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import rotas from "../src/routes/index.js";
import DisciplinaModel from "../src/models/DisciplinaModel.js";
import UsuarioModel from "../src/models/UsuarioModel.js";

// Nada aqui toca o MySQL: o pool e os models viram dublês
vi.mock("../src/database/db.js", () => ({
  default: { query: vi.fn() },
}));

vi.mock("../src/models/DisciplinaModel.js", () => ({
  default: {
    listar: vi.fn(),
    buscarPorId: vi.fn(),
    criar: vi.fn(),
    atualizar: vi.fn(),
    remover: vi.fn(),
  },
}));

vi.mock("../src/models/UsuarioModel.js", () => ({
  default: {
    buscarPorEmail: vi.fn(),
    buscarPorId: vi.fn(),
    criar: vi.fn(),
    semSenha: vi.fn(),
  },
}));

const envOriginal = { ...process.env };

// Mesma montagem do server.js, sem conectar ao banco nem chamar listen
function montarApp() {
  const app = express();
  app.use(express.json());
  app.use("/api", rotas);
  app.use((erro, req, res, next) => {
    res.status(500).json({ erro: "Erro interno no servidor." });
  });
  return app;
}

function tokenDe(papel, segredo = process.env.JWT_SEGREDO) {
  return jwt.sign({ id: 1, papel }, segredo, { expiresIn: "1h" });
}

const app = montarApp();

beforeEach(() => {
  vi.clearAllMocks();
  process.env.JWT_SEGREDO = "segredo-de-teste";
  process.env.CODIGO_PROFESSOR = "codigo-professor";
  process.env.CODIGO_COORDENADOR = "codigo-coordenador";
});

afterEach(() => {
  process.env = { ...envOriginal };
});

describe("DELETE /api/disciplinas/:id", () => {
  it("recusa pedido sem token com 401", async () => {
    const resposta = await request(app).delete("/api/disciplinas/1");

    expect(resposta.status).toBe(401);
    expect(DisciplinaModel.remover).not.toHaveBeenCalled();
  });

  it("recusa coordenador com 403", async () => {
    const resposta = await request(app)
      .delete("/api/disciplinas/1")
      .set("Authorization", `Bearer ${tokenDe("coordenador")}`);

    expect(resposta.status).toBe(403);
    expect(DisciplinaModel.remover).not.toHaveBeenCalled();
  });

  it("recusa aluno com 403", async () => {
    const resposta = await request(app)
      .delete("/api/disciplinas/1")
      .set("Authorization", `Bearer ${tokenDe("aluno")}`);

    expect(resposta.status).toBe(403);
    expect(DisciplinaModel.remover).not.toHaveBeenCalled();
  });

  it("deixa o professor apagar e responde 204", async () => {
    DisciplinaModel.remover.mockResolvedValue(true);

    const resposta = await request(app)
      .delete("/api/disciplinas/1")
      .set("Authorization", `Bearer ${tokenDe("professor")}`);

    expect(resposta.status).toBe(204);
    expect(DisciplinaModel.remover).toHaveBeenCalledWith("1");
  });

  it("recusa token assinado com outro segredo com 401", async () => {
    const resposta = await request(app)
      .delete("/api/disciplinas/1")
      .set("Authorization", `Bearer ${tokenDe("professor", "outro-segredo")}`);

    expect(resposta.status).toBe(401);
    expect(DisciplinaModel.remover).not.toHaveBeenCalled();
  });
});

describe("POST /api/auth/registrar", () => {
  const professorSemCodigo = {
    nome: "Fulano",
    email: "fulano@fatec.sp.gov.br",
    senha: "senha-forte-123",
    papel: "professor",
  };

  it("recusa professor sem código com 403", async () => {
    const resposta = await request(app)
      .post("/api/auth/registrar")
      .send(professorSemCodigo);

    expect(resposta.status).toBe(403);
    expect(UsuarioModel.criar).not.toHaveBeenCalled();
  });

  it("recusa professor sem código quando CODIGO_PROFESSOR não existe", async () => {
    delete process.env.CODIGO_PROFESSOR;

    const resposta = await request(app)
      .post("/api/auth/registrar")
      .send(professorSemCodigo);

    expect(resposta.status).toBe(403);
    expect(UsuarioModel.criar).not.toHaveBeenCalled();
  });

  it("recusa aluno com senha curta com 400", async () => {
    const resposta = await request(app).post("/api/auth/registrar").send({
      nome: "Aluno",
      email: "aluno@fatec.sp.gov.br",
      senha: "123",
      papel: "aluno",
    });

    expect(resposta.status).toBe(400);
    expect(UsuarioModel.criar).not.toHaveBeenCalled();
  });
});
