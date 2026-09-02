import Card from "../components/Card";
import { atalhosHome } from "../data/dados";

const etapas = [
  { id: 1, nome: "Front-end com React", situacao: "Etapa atual" },
  { id: 2, nome: "Back-end com Node e Express", situacao: "A seguir" },
  { id: 3, nome: "Integração e banco de dados", situacao: "A seguir" },
];

function Home() {
  return (
    <main className="container">
      <section className="destaque">
        <h2 className="destaque-titulo">
          Um semestre inteiro de DSM reunido em um só lugar.
        </h2>
        <p className="destaque-texto">
          O Portal DSM organiza as disciplinas, a equipe e os contatos do 4º
          semestre de Desenvolvimento de Software Multiplataforma da Fatec
          Matão. Esta é a etapa de front-end do projeto, construída com React,
          Vite e React Router.
        </p>
      </section>

      <section className="secao">
        <h3 className="secao-titulo">Etapas do projeto</h3>
        <ol className="etapas">
          {etapas.map((etapa) => (
            <li
              key={etapa.id}
              className={etapa.id === 1 ? "etapa etapa-atual" : "etapa"}
            >
              <span className="etapa-numero">{etapa.id}</span>
              <span className="etapa-nome">{etapa.nome}</span>
              <span className="etapa-situacao">{etapa.situacao}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="secao">
        <h3 className="secao-titulo">Comece por aqui</h3>
        <div className="cards">
          {atalhosHome.map((atalho) => (
            <Card
              key={atalho.id}
              titulo={atalho.titulo}
              descricao={atalho.descricao}
              para={atalho.para}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
