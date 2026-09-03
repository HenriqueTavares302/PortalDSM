import { NavLink } from "react-router";

const abas = [
  { para: "/gerenciar", rotulo: "Disciplinas", fim: true },
  { para: "/gerenciar/alunos", rotulo: "Alunos", fim: false },
];

function MenuGerenciar() {
  return (
    <nav className="abas" aria-label="Seções do gerenciamento">
      {abas.map((aba) => (
        <NavLink
          key={aba.para}
          to={aba.para}
          end={aba.fim}
          className={({ isActive }) => (isActive ? "aba aba-ativa" : "aba")}
        >
          {aba.rotulo}
        </NavLink>
      ))}
    </nav>
  );
}

export default MenuGerenciar;
