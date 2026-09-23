const BASE_URL = "http://localhost:3001";

const CHAVE_TOKEN = "portal-dsm-token";

export const lerToken = () => localStorage.getItem(CHAVE_TOKEN);
export const guardarToken = (token) => localStorage.setItem(CHAVE_TOKEN, token);
export const apagarToken = () => localStorage.removeItem(CHAVE_TOKEN);

async function requisitar(caminho, opcoes = {}) {
  const token = lerToken();

  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opcoes.headers,
    },
  });

  if (resposta.status === 401) {
    apagarToken();
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.erro ?? "Não foi possível completar a operação.");
  }

  return dados;
}

export function urlDaFoto(caminho) {
  return caminho ? `${BASE_URL}${caminho}` : null;
}

export async function enviarFoto(arquivo) {
  const corpo = new FormData();
  corpo.append("foto", arquivo);

  const token = lerToken();

  const resposta = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: corpo,
  });

  if (resposta.status === 401) {
    apagarToken();
  }

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.erro ?? "Não foi possível enviar a imagem.");
  }

  return dados.caminho;
}

export const entrar = (email, senha) =>
  requisitar("/api/auth/entrar", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });

export const registrar = (dados) =>
  requisitar("/api/auth/registrar", {
    method: "POST",
    body: JSON.stringify(dados),
  });

export const usuarioAtual = () =>
  lerToken()
    ? requisitar("/api/auth/eu")
    : Promise.reject(new Error("Sem sessão."));

export const listarDisciplinas = () => requisitar("/api/disciplinas");

export const criarDisciplina = (dados) =>
  requisitar("/api/disciplinas", {
    method: "POST",
    body: JSON.stringify(dados),
  });

export const atualizarDisciplina = (id, dados) =>
  requisitar(`/api/disciplinas/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });

export const removerDisciplina = (id) =>
  requisitar(`/api/disciplinas/${id}`, { method: "DELETE" });

export const listarAlunos = () => requisitar("/api/alunos");

export const criarAluno = (dados) =>
  requisitar("/api/alunos", {
    method: "POST",
    body: JSON.stringify(dados),
  });

export const atualizarAluno = (id, dados) =>
  requisitar(`/api/alunos/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });

export const removerAluno = (id) =>
  requisitar(`/api/alunos/${id}`, { method: "DELETE" });