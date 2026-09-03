import pool from "./db.js";

const disciplinas = `
  CREATE TABLE IF NOT EXISTS disciplinas (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nome      VARCHAR(120) NOT NULL,
    area      VARCHAR(30)  NOT NULL,
    area_nome VARCHAR(30)  NOT NULL,
    descricao TEXT         NOT NULL,
    carga     VARCHAR(20)  NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const alunos = `
  CREATE TABLE IF NOT EXISTS alunos (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nome      VARCHAR(120) NOT NULL,
    papel     VARCHAR(40)  NOT NULL,
    descricao TEXT         NOT NULL,
    iniciais  VARCHAR(4)   NOT NULL,
    foto      VARCHAR(200) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const usuarios = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    nome  VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    papel ENUM('professor', 'coordenador', 'aluno') NOT NULL DEFAULT 'aluno'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

export default async function criarTabelas() {
  await pool.query(disciplinas);
  await pool.query(alunos);
  await pool.query(usuarios);
}
