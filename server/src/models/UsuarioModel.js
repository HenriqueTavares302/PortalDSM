import pool from "../database/db.js";

// Nunca devolve a senha junto com os dados do usuário
function semSenha(linha) {
  if (!linha) return null;
  return {
    id: linha.id,
    nome: linha.nome,
    email: linha.email,
    papel: linha.papel,
  };
}

const UsuarioModel = {
  async buscarPorEmail(email) {
    const [linhas] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);
    return linhas[0] ?? null;
  },

  async buscarPorId(id) {
    const [linhas] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return semSenha(linhas[0]);
  },

  async criar({ nome, email, senhaHash, papel }) {
    const [resultado] = await pool.query(
      "INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)",
      [nome, email, senhaHash, papel]
    );
    return this.buscarPorId(resultado.insertId);
  },

  semSenha,
};

export default UsuarioModel;
