import DisciplinaModel from "../models/DisciplinaModel.js";

const camposObrigatorios = ["nome", "area", "areaNome", "descricao", "carga"];

function validar(corpo) {
  return camposObrigatorios.filter(
    (campo) => !corpo[campo] || String(corpo[campo]).trim() === ""
  );
}

const DisciplinaController = {
  async listar(req, res, next) {
    try {
      res.json(await DisciplinaModel.listar());
    } catch (erro) {
      next(erro);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const disciplina = await DisciplinaModel.buscarPorId(req.params.id);
      if (!disciplina) {
        return res.status(404).json({ erro: "Disciplina não encontrada." });
      }
      res.json(disciplina);
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
      res.status(201).json(await DisciplinaModel.criar(req.body));
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
      const disciplina = await DisciplinaModel.atualizar(req.params.id, req.body);
      if (!disciplina) {
        return res.status(404).json({ erro: "Disciplina não encontrada." });
      }
      res.json(disciplina);
    } catch (erro) {
      next(erro);
    }
  },

  async remover(req, res, next) {
    try {
      const removida = await DisciplinaModel.remover(req.params.id);
      if (!removida) {
        return res.status(404).json({ erro: "Disciplina não encontrada." });
      }
      res.status(204).end();
    } catch (erro) {
      next(erro);
    }
  },
};

export default DisciplinaController;
