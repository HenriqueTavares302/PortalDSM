import fotoHenrique from "../assets/henrique.jpg";

export const disciplinas = [
  {
    id: "web",
    nome: "Laboratório de Desenvolvimento Web",
    area: "web",
    areaNome: "Web",
    descricao:
      "Construção de interfaces com React, Vite e React Router, com integração posterior a uma API em Node.js e Express.",
    carga: "80 h",
  },
  {
    id: "mobile",
    nome: "Programação de Dispositivos Móveis",
    area: "mobile",
    areaNome: "Mobile",
    descricao:
      "Desenvolvimento de aplicativos multiplataforma com Flutter, do layout às chamadas de rede.",
    carga: "80 h",
  },
  {
    id: "dados",
    nome: "Banco de Dados",
    area: "dados",
    areaNome: "Dados",
    descricao:
      "Modelagem relacional, SQL e estratégias de persistência aplicadas aos projetos do semestre.",
    carga: "80 h",
  },
  {
    id: "engenharia",
    nome: "Engenharia de Software",
    area: "processo",
    areaNome: "Processo",
    descricao:
      "Levantamento de requisitos, arquitetura em camadas e boas práticas como SOLID e testes automatizados.",
    carga: "60 h",
  },
  {
    id: "gestao",
    nome: "Gestão de Projetos",
    area: "processo",
    areaNome: "Processo",
    descricao:
      "Planejamento de entregas, divisão de tarefas e acompanhamento do projeto integrador da turma.",
    carga: "40 h",
  },
  {
    id: "ia",
    nome: "Inteligência Artificial",
    area: "dados",
    areaNome: "Dados",
    descricao:
      "Fundamentos de aprendizado de máquina e aplicação prática em problemas do dia a dia.",
    carga: "60 h",
  },
];

export const alunos = [
  {
    id: "henrique",
    nome: "Henrique Tavares Andrade",
    papel: "Back-end",
    descricao:
      "Responsável pela API em Node.js e Express, modelagem dos dados e organização do projeto em camadas.",
    foto: fotoHenrique,
    iniciais: "HA",
  },
  {
    id: "lucas",
    nome: "Lucas Zanardi Catto",
    papel: "Front-end",
    descricao:
      "Cuida das interfaces em React, da componentização e do comportamento responsivo das telas.",
    foto: null,
    iniciais: "LC",
  },
  {
    id: "joao",
    nome: "João Pedro Montrezor",
    papel: "Mobile",
    descricao:
      "Desenvolve a versão em Flutter e mantém a paridade entre o aplicativo e a versão web.",
    foto: null,
    iniciais: "JM",
  },
];

export const atalhosHome = [
  {
    id: "alunos",
    titulo: "Alunos",
    descricao: "Quem faz parte da equipe e o que cada um desenvolve.",
    para: "/alunos",
  },
  {
    id: "cursos",
    titulo: "Disciplinas",
    descricao: "As seis matérias do semestre e o que cada uma cobre.",
    para: "/cursos",
  },
  {
    id: "contato",
    titulo: "Contato",
    descricao: "Como falar com a equipe e com a coordenação do curso.",
    para: "/contato",
  },
];
