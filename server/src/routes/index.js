import { Router } from "express";
import DisciplinaController from "../controllers/DisciplinaController.js";
import AlunoController from "../controllers/AlunoController.js";
import AuthController from "../controllers/AuthController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";

const rotas = Router();

// Quem pode gravar. Apagar é exclusivo do professor.
const podeEscrever = autorizar("professor", "coordenador");
const podeApagar = autorizar("professor");

/* ---------- Autenticação (rotas abertas) ---------- */
rotas.post("/auth/registrar", AuthController.registrar);
rotas.post("/auth/entrar", AuthController.entrar);
rotas.get("/auth/eu", autenticar, AuthController.eu);

/* ---------- Disciplinas ---------- */
rotas.get("/disciplinas", autenticar, DisciplinaController.listar);
rotas.get("/disciplinas/:id", autenticar, DisciplinaController.buscarPorId);
rotas.post("/disciplinas", autenticar, podeEscrever, DisciplinaController.criar);
rotas.put("/disciplinas/:id", autenticar, podeEscrever, DisciplinaController.atualizar);
rotas.delete("/disciplinas/:id", autenticar, podeApagar, DisciplinaController.remover);

/* ---------- Alunos ---------- */
rotas.get("/alunos", autenticar, AlunoController.listar);
rotas.get("/alunos/:id", autenticar, AlunoController.buscarPorId);
rotas.post("/alunos", autenticar, podeEscrever, AlunoController.criar);
rotas.put("/alunos/:id", autenticar, podeEscrever, AlunoController.atualizar);
rotas.delete("/alunos/:id", autenticar, podeApagar, AlunoController.remover);

export default rotas;
