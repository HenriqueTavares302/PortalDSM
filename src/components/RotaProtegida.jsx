import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

// Envolve as rotas que exigem login. Se `papeis` for informado,
// exige também que o usuário tenha um desses perfis.
function RotaProtegida({ papeis, children }) {
  const { usuario, carregando } = useAuth();
  const local = useLocation();

  if (carregando) {
    return (
      <main className="container">
        <p className="aviso">Verificando sessão...</p>
      </main>
    );
  }

  if (!usuario) {
    return <Navigate to="/entrar" state={{ de: local.pathname }} replace />;
  }

  if (papeis && !papeis.includes(usuario.papel)) {
    return (
      <main className="container container-estreito">
        <h2 className="pagina-titulo">Acesso restrito</h2>
        <p className="pagina-texto">
          Seu perfil ({usuario.papel}) não tem permissão para abrir esta área.
        </p>
      </main>
    );
  }

  return children;
}

export default RotaProtegida;
