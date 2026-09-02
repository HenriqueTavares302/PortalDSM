function Header() {
  return (
    <header className="cabecalho">
      <div className="cabecalho-interno">
        <div className="marca">
          <span className="marca-nome">Portal DSM</span>
          <span className="marca-linha" aria-hidden="true"></span>
          <span className="marca-curso">
            Desenvolvimento de Software Multiplataforma
          </span>
        </div>
        <p className="cabecalho-origem">
          Fatec Matão
          <br />
          <span>4º semestre, Laboratório de Desenvolvimento Web</span>
        </p>
      </div>
    </header>
  );
}

export default Header;
