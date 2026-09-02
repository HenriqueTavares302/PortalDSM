function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">
      <div className="rodape-interno">
        <p className="rodape-titulo">Portal DSM</p>
        <p>
          Projeto acadêmico de Henrique Tavares Andrade para a disciplina de
          Laboratório de Desenvolvimento Web, 4º semestre de DSM na Fatec
          Matão.
        </p>
        <p className="rodape-ano">Fatec Matão, {ano}</p>
      </div>
    </footer>
  );
}

export default Footer;
