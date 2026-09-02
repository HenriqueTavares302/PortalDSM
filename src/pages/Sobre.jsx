function Sobre() {
  return (
    <main className="container">
      <h2 className="pagina-titulo">Sobre o projeto</h2>

      <div className="texto-longo">
        <p>
          O Portal DSM foi desenvolvido na disciplina de Laboratório de
          Desenvolvimento Web do 4º semestre de Desenvolvimento de Software
          Multiplataforma da Fatec Matão, sob orientação do professor Marivaldo
          Alcantara.
        </p>
        <p>
          A aplicação usa React para a construção da interface, Vite como
          ambiente de desenvolvimento e React Router para a navegação entre as
          páginas. A interface é dividida em componentes reutilizáveis, que
          recebem seu conteúdo por props, e o layout se adapta a telas de
          computador, tablet e celular.
        </p>
        <p>
          Os dados exibidos ainda são estáticos e ficam separados da
          apresentação, no arquivo <code>src/data/dados.js</code>. Na etapa
          seguinte esse arquivo será substituído por respostas de uma API em
          Node.js com Express, sem que as páginas precisem mudar de estrutura.
        </p>
      </div>

      <h3 className="secao-titulo">Como o projeto está organizado</h3>
      <dl className="lista-definicao">
        <div>
          <dt>components</dt>
          <dd>Partes reutilizáveis da interface: cabeçalho, menu, cartão e rodapé.</dd>
        </div>
        <div>
          <dt>pages</dt>
          <dd>As telas da aplicação, uma para cada rota.</dd>
        </div>
        <div>
          <dt>data</dt>
          <dd>Conteúdo estático das páginas, separado da apresentação.</dd>
        </div>
        <div>
          <dt>App.jsx</dt>
          <dd>Composição do layout fixo e definição das rotas.</dd>
        </div>
        <div>
          <dt>main.jsx</dt>
          <dd>Ponto de entrada do React e configuração do BrowserRouter.</dd>
        </div>
        <div>
          <dt>index.css</dt>
          <dd>Estilos globais, paleta de cores e regras de responsividade.</dd>
        </div>
      </dl>
    </main>
  );
}

export default Sobre;
