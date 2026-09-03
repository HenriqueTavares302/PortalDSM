// Recebe os papéis que podem passar e devolve um middleware.
// Uso: autorizar("professor") ou autorizar("professor", "coordenador")
export default function autorizar(...papeisPermitidos) {
  return function (req, res, next) {
    if (!req.usuario) {
      return res.status(401).json({ erro: "Faça login para continuar." });
    }

    if (!papeisPermitidos.includes(req.usuario.papel)) {
      return res
        .status(403)
        .json({ erro: "Seu perfil não tem permissão para esta ação." });
    }

    next();
  };
}
