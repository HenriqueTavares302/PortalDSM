import { useEffect, useState } from "react";
import Card from "../components/Card";
import { listarAlunos, urlDaFoto } from "../services/api";

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    listarAlunos()
      .then((dados) => setAlunos(dados))
      .catch(() => setErro("Não foi possível carregar os alunos."))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <main className="container">
      <h2 className="pagina-titulo">Alunos</h2>
      <p className="pagina-texto">
        A equipe do projeto integrador do 4º semestre e a frente de trabalho de
        cada integrante.
      </p>

      {carregando ? <p className="aviso">Carregando alunos...</p> : null}

      {erro ? (
        <p className="aviso aviso-erro">
          {erro} Verifique se a API está rodando em localhost:3001.
        </p>
      ) : null}

      {!carregando && !erro ? (
        <div className="cards cards-alunos">
          {alunos.map((aluno) => (
            <Card
              key={aluno.id}
              titulo={aluno.nome}
              papel={aluno.papel}
              descricao={aluno.descricao}
              foto={urlDaFoto(aluno.foto)}
              iniciais={aluno.iniciais}
            />
          ))}
        </div>
      ) : null}
    </main>
  );
}

export default Alunos;
