import pool from "../database/db.js";

// Converte a linha do banco (area_nome) para o formato usado pelo front (areaNome)
function paraObjeto(linha) {
  if (!linha) return null;
  return {
    id: linha.id,
    nome: linha.nome,
    area: linha.area,
    areaNome: linha.area_nome,
    descricao: linha.descricao,
    carga: linha.carga,
  };
}

const DisciplinaModel = {
  async listar() {
    const [linhas] = await pool.query("SELECT * FROM disciplinas ORDER BY id");
    return linhas.map(paraObjeto);
  },

  async buscarPorId(id) {
    const [linhas] = await pool.query("SELECT * FROM disciplinas WHERE id = ?", [id]);
    return paraObjeto(linhas[0]);
  },

  async criar({ nome, area, areaNome, descricao, carga }) {
    const [resultado] = await pool.query(
      "INSERT INTO disciplinas (nome, area, area_nome, descricao, carga) VALUES (?, ?, ?, ?, ?)",
      [nome, area, areaNome, descricao, carga]
    );
    return this.buscarPorId(resultado.insertId);
  },

  async atualizar(id, { nome, area, areaNome, descricao, carga }) {
    const [resultado] = await pool.query(
      "UPDATE disciplinas SET nome = ?, area = ?, area_nome = ?, descricao = ?, carga = ? WHERE id = ?",
      [nome, area, areaNome, descricao, carga, id]
    );
    if (resultado.affectedRows === 0) return null;
    return this.buscarPorId(id);
  },

  async remover(id) {
    const [resultado] = await pool.query("DELETE FROM disciplinas WHERE id = ?", [id]);
    return resultado.affectedRows > 0;
  },
};

export default DisciplinaModel;
