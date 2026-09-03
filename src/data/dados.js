// Conteúdo fixo de navegação da página inicial.
// As disciplinas e os alunos não estão mais aqui: vêm da API (src/services/api.js).

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
    descricao: "As matérias do semestre e o que cada uma cobre.",
    para: "/cursos",
  },
  {
    id: "gerenciar",
    titulo: "Gerenciar",
    descricao: "Cadastrar, editar e apagar disciplinas.",
    para: "/gerenciar",
  },
];
