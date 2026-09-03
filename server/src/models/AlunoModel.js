import pool from "../database/db.js";

const AlunoModel = {
  async listar() {
    const [linhas] = await pool.query("SELECT * FROM alunos ORDER BY id");
    return linhas;
  },

  async buscarPorId(id) {
    const [linhas] = await pool.query("SELECT * FROM alunos WHERE id = ?", [id]);
    return linhas[0] ?? null;
  },

  async criar({ nome, papel, descricao, iniciais, foto = null }) {
    const [resultado] = await pool.query(
      "INSERT INTO alunos (nome, papel, descricao, iniciais, foto) VALUES (?, ?, ?, ?, ?)",
      [nome, papel, descricao, iniciais, foto]
    );
    return this.buscarPorId(resultado.insertId);
  },

  async atualizar(id, { nome, papel, descricao, iniciais, foto = null }) {
    const [resultado] = await pool.query(
      "UPDATE alunos SET nome = ?, papel = ?, descricao = ?, iniciais = ?, foto = ? WHERE id = ?",
      [nome, papel, descricao, iniciais, foto, id]
    );
    if (resultado.affectedRows === 0) return null;
    return this.buscarPorId(id);
  },

  async remover(id) {
    const [resultado] = await pool.query("DELETE FROM alunos WHERE id = ?", [id]);
    return resultado.affectedRows > 0;
  },
};

export default AlunoModel;
