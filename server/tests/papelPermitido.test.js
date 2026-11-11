import { describe, it, expect, beforeEach, afterEach } from "vitest";
import papelPermitido from "../src/regras/papelPermitido.js";

const envOriginal = { ...process.env };

describe("papelPermitido", () => {
  beforeEach(() => {
    process.env.CODIGO_PROFESSOR = "codigo-professor";
    process.env.CODIGO_COORDENADOR = "codigo-coordenador";
  });

  afterEach(() => {
    process.env = { ...envOriginal };
  });

  it("libera aluno sem código", () => {
    expect(papelPermitido("aluno")).toBe(true);
  });

  it("libera professor com o código certo", () => {
    expect(papelPermitido("professor", "codigo-professor")).toBe(true);
  });

  it("libera coordenador com o código certo", () => {
    expect(papelPermitido("coordenador", "codigo-coordenador")).toBe(true);
  });

  it("recusa professor com código errado", () => {
    expect(papelPermitido("professor", "chute")).toBe(false);
  });

  it("recusa professor usando o código do coordenador", () => {
    expect(papelPermitido("professor", "codigo-coordenador")).toBe(false);
  });

  it("recusa perfil desconhecido", () => {
    expect(papelPermitido("admin", "codigo-professor")).toBe(false);
  });

  // Sem a variável no .env, undefined === undefined não pode liberar o cadastro
  it("recusa professor sem código quando CODIGO_PROFESSOR não existe", () => {
    delete process.env.CODIGO_PROFESSOR;
    expect(papelPermitido("professor")).toBe(false);
  });

  it("recusa coordenador sem código quando CODIGO_COORDENADOR não existe", () => {
    delete process.env.CODIGO_COORDENADOR;
    expect(papelPermitido("coordenador")).toBe(false);
  });
});
