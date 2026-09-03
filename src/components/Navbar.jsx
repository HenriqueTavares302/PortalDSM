import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const paginas = [
  { para: "/", rotulo: "Início" },
  { para: "/alunos", rotulo: "Alunos" },
  { para: "/cursos", rotulo: "Disciplinas" },
  { para: "/sobre", rotulo: "Sobre" },
  { para: "/contato", rotulo: "Contato" },
];

function Navbar() {
  const { usuario, podeEscrever, sair } = useAuth();
  const navegar = useNavigate();

  // Sem login, o menu não faz sentido: só existe a tela de entrar
  if (!usuario) return null;

  function encerrar() {
    sair();
    navegar("/entrar", { replace: true });
  }

  return (
    <nav className="menu" aria-label="Navegação principal">
      <div className="menu-interno">
        <div className="menu-links">
          {paginas.map((pagina) => (
            <NavLink
              key={pagina.para}
              to={pagina.para}
              end={pagina.para === "/"}
              className={({ isActive }) =>
                isActive ? "menu-item menu-item-ativo" : "menu-item"
              }
            >
              {pagina.rotulo}
            </NavLink>
          ))}

          {podeEscrever ? (
            <NavLink
              to="/gerenciar"
              className={({ isActive }) =>
                isActive ? "menu-item menu-item-ativo" : "menu-item"
              }
            >
              Gerenciar
            </NavLink>
          ) : null}
        </div>

        <div className="menu-usuario">
          <span className="menu-nome">
            {usuario.nome}
            <span className="menu-papel">{usuario.papel}</span>
          </span>
          <button className="botao-texto" type="button" onClick={encerrar}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
