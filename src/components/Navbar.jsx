import { NavLink } from "react-router";

const paginas = [
  { para: "/", rotulo: "Início" },
  { para: "/alunos", rotulo: "Alunos" },
  { para: "/cursos", rotulo: "Disciplinas" },
  { para: "/sobre", rotulo: "Sobre" },
  { para: "/contato", rotulo: "Contato" },
];

function Navbar() {
  return (
    <nav className="menu" aria-label="Navegação principal">
      <div className="menu-interno">
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
      </div>
    </nav>
  );
}

export default Navbar;
