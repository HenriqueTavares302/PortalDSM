// O papel é declarado pelo usuário, mas conferido pelo servidor.
// Aluno é livre; professor e coordenador exigem o código guardado no .env.
const variavelDoCodigo = {
  professor: "CODIGO_PROFESSOR",
  coordenador: "CODIGO_COORDENADOR",
};

export default function papelPermitido(papel, codigo) {
  if (papel === "aluno") return true;
  if (!Object.hasOwn(variavelDoCodigo, papel)) return false;

  // Sem código configurado no .env, ninguém consegue esse perfil
  const esperado = process.env[variavelDoCodigo[papel]];
  if (!esperado || typeof codigo !== "string") return false;

  return codigo === esperado;
}
