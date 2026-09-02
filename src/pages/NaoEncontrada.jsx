import { Link } from "react-router";

function NaoEncontrada() {
  return (
    <main className="container">
      <h2 className="pagina-titulo">Página não encontrada</h2>
      <p className="pagina-texto">
        O endereço digitado não corresponde a nenhuma página do Portal DSM.
      </p>
      <Link className="botao" to="/">
        Voltar para o início
      </Link>
    </main>
  );
}

export default NaoEncontrada;
