import Card from "../components/Card";
import { disciplinas } from "../data/dados";

function Cursos() {
  return (
    <main className="container">
      <h2 className="pagina-titulo">Disciplinas do 4º DSM</h2>
      <p className="pagina-texto">
        As seis matérias do semestre. A faixa colorida à esquerda de cada
        cartão indica a área a que a disciplina pertence.
      </p>

      <div className="cards">
        {disciplinas.map((disciplina) => (
          <Card
            key={disciplina.id}
            titulo={disciplina.nome}
            descricao={disciplina.descricao}
            area={disciplina.area}
            etiqueta={`${disciplina.areaNome}, ${disciplina.carga}`}
          />
        ))}
      </div>
    </main>
  );
}

export default Cursos;
