// O papel é declarado pelo usuário, mas conferido pelo servidor.
// Aluno é livre; professor e coordenador exigem o código guardado no .env.
export default function papelPermitido(papel, codigo) {
  if (papel === "aluno") return true;
  if (papel === "professor") return codigo === process.env.CODIGO_PROFESSOR;
  if (papel === "coordenador") return codigo === process.env.CODIGO_COORDENADOR;
  return false;
}
