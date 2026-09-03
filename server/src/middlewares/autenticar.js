import jwt from "jsonwebtoken";

// Lê o token do cabeçalho Authorization e identifica quem está pedindo.
// Sem token válido, a requisição para aqui e nunca chega ao controller.
export default function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization;

  if (!cabecalho || !cabecalho.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Faça login para continuar." });
  }

  const token = cabecalho.slice(7);

  try {
    const conteudo = jwt.verify(token, process.env.JWT_SEGREDO);
    req.usuario = { id: conteudo.id, papel: conteudo.papel };
    next();
  } catch {
    return res.status(401).json({ erro: "Sessão expirada. Faça login de novo." });
  }
}
