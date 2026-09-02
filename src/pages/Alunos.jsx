import Card from "../components/Card";
import { alunos } from "../data/dados";

function Alunos() {
  return (
    <main className="container">
      <h2 className="pagina-titulo">Alunos</h2>
      <p className="pagina-texto">
        A equipe do projeto integrador do 4º semestre e a frente de trabalho de
        cada integrante.
      </p>

      <div className="cards cards-alunos">
        {alunos.map((aluno) => (
          <Card
            key={aluno.id}
            titulo={aluno.nome}
            papel={aluno.papel}
            descricao={aluno.descricao}
            foto={aluno.foto}
            iniciais={aluno.iniciais}
          />
        ))}
      </div>
    </main>
  );
}

export default Alunos;
