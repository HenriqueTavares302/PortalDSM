import { useEffect, useState } from "react";
import Card from "../components/Card";
import { listarDisciplinas } from "../services/api";

function Cursos() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Roda uma vez, quando a página entra na tela
  useEffect(() => {
    listarDisciplinas()
      .then((dados) => setDisciplinas(dados))
      .catch(() => setErro("Não foi possível carregar as disciplinas."))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <main className="container">
      <h2 className="pagina-titulo">Disciplinas do 4º DSM</h2>
      <p className="pagina-texto">
        As matérias do semestre. A faixa colorida à esquerda de cada cartão
        indica a área a que a disciplina pertence.
      </p>

      {carregando ? <p className="aviso">Carregando disciplinas...</p> : null}

      {erro ? (
        <p className="aviso aviso-erro">
          {erro} Verifique se a API está rodando em localhost:3001.
        </p>
      ) : null}

      {!carregando && !erro ? (
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
      ) : null}
    </main>
  );
}

export default Cursos;
