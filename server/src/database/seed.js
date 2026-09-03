import bcrypt from "bcryptjs";
import pool from "./db.js";
import criarTabelas from "./criarTabelas.js";

const disciplinas = [
  ["Laboratório de Desenvolvimento Web", "web", "Web", "Construção de interfaces com React, Vite e React Router, com integração posterior a uma API em Node.js e Express.", "80 h"],
  ["Programação de Dispositivos Móveis", "mobile", "Mobile", "Desenvolvimento de aplicativos multiplataforma com Flutter, do layout às chamadas de rede.", "80 h"],
  ["Banco de Dados", "dados", "Dados", "Modelagem relacional, SQL e estratégias de persistência aplicadas aos projetos do semestre.", "80 h"],
  ["Engenharia de Software", "processo", "Processo", "Levantamento de requisitos, arquitetura em camadas e boas práticas como SOLID e testes automatizados.", "60 h"],
  ["Gestão de Projetos", "processo", "Processo", "Planejamento de entregas, divisão de tarefas e acompanhamento do projeto integrador da turma.", "40 h"],
  ["Inteligência Artificial", "dados", "Dados", "Fundamentos de aprendizado de máquina e aplicação prática em problemas do dia a dia.", "60 h"],
];

const alunos = [
  ["Henrique Tavares Andrade", "Back-end", "Responsável pela API em Node.js e Express, modelagem dos dados e organização do projeto em camadas.", "HA", "/fotos/henrique.jpg"],
  ["Lucas Zanardi Catto", "Front-end", "Cuida das interfaces em React, da componentização e do comportamento responsivo das telas.", "LC", null],
  ["João Pedro Montrezor", "Mobile", "Desenvolve a versão em Flutter e mantém a paridade entre o aplicativo e a versão web.", "JM", null],
];

// Contas de demonstração, para o projeto poder ser avaliado sem cadastro manual.
// Em um sistema real essas contas não existiriam.
const usuariosDemo = [
  ["Marivaldo Alcantara", "professor@portaldsm.local", "professor123", "professor"],
  ["Coordenação DSM", "coordenador@portaldsm.local", "coordenador123", "coordenador"],
  ["Aluno Visitante", "aluno@portaldsm.local", "aluno123456", "aluno"],
];

async function popular() {
  await criarTabelas();

  const [linhasDisciplinas] = await pool.query(
    "SELECT COUNT(*) AS total FROM disciplinas"
  );
  if (linhasDisciplinas[0].total === 0) {
    await pool.query(
      "INSERT INTO disciplinas (nome, area, area_nome, descricao, carga) VALUES ?",
      [disciplinas]
    );
    console.log(`${disciplinas.length} disciplinas inseridas.`);
  } else {
    console.log("Disciplinas já existem, nada foi inserido.");
  }

  const [linhasAlunos] = await pool.query("SELECT COUNT(*) AS total FROM alunos");
  if (linhasAlunos[0].total === 0) {
    await pool.query(
      "INSERT INTO alunos (nome, papel, descricao, iniciais, foto) VALUES ?",
      [alunos]
    );
    console.log(`${alunos.length} alunos inseridos.`);
  } else {
    console.log("Alunos já existem, nada foi inserido.");
  }

  const [linhasUsuarios] = await pool.query(
    "SELECT COUNT(*) AS total FROM usuarios"
  );
  if (linhasUsuarios[0].total === 0) {
    const comHash = await Promise.all(
      usuariosDemo.map(async ([nome, email, senha, papel]) => [
        nome,
        email,
        await bcrypt.hash(senha, 10),
        papel,
      ])
    );
    await pool.query(
      "INSERT INTO usuarios (nome, email, senha, papel) VALUES ?",
      [comHash]
    );
    console.log(`${usuariosDemo.length} usuários de demonstração criados.`);
  } else {
    console.log("Usuários já existem, nada foi inserido.");
  }

  console.log("Banco pronto.");
  await pool.end();
}

popular().catch((erro) => {
  console.error("Erro ao popular o banco:", erro.message);
  process.exit(1);
});
