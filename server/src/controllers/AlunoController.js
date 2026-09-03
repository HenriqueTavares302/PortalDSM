import AlunoModel from "../models/AlunoModel.js";

const camposObrigatorios = ["nome", "papel", "descricao", "iniciais"];

function validar(corpo) {
  return camposObrigatorios.filter(
    (campo) => !corpo[campo] || String(corpo[campo]).trim() === ""
  );
}

const AlunoController = {
  async listar(req, res, next) {
    try {
      res.json(await AlunoModel.listar());
    } catch (erro) {
      next(erro);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const aluno = await AlunoModel.buscarPorId(req.params.id);
      if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado." });
      res.json(aluno);
    } catch (erro) {
      next(erro);
    }
  },

  async criar(req, res, next) {
    try {
      const faltando = validar(req.body);
      if (faltando.length > 0) {
        return res
          .status(400)
          .json({ erro: `Campos obrigatórios: ${faltando.join(", ")}.` });
      }
      res.status(201).json(await AlunoModel.criar(req.body));
    } catch (erro) {
      next(erro);
    }
  },

  async atualizar(req, res, next) {
    try {
      const faltando = validar(req.body);
      if (faltando.length > 0) {
        return res
          .status(400)
          .json({ erro: `Campos obrigatórios: ${faltando.join(", ")}.` });
      }
      const aluno = await AlunoModel.atualizar(req.params.id, req.body);
      if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado." });
      res.json(aluno);
    } catch (erro) {
      next(erro);
    }
  },

  async remover(req, res, next) {
    try {
      const removido = await AlunoModel.remover(req.params.id);
      if (!removido) return res.status(404).json({ erro: "Aluno não encontrado." });
      res.status(204).end();
    } catch (erro) {
      next(erro);
    }
  },
};

export default AlunoController;
