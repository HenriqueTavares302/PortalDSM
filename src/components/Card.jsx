import { Link } from "react-router";

function Card({ titulo, descricao, area, etiqueta, foto, iniciais, papel, para }) {
  const classes = ["card"];
  if (area) classes.push(`card-${area}`);
  if (para) classes.push("card-navegavel");

  const conteudo = (
    <>
      {foto ? (
        <img className="card-foto" src={foto} alt={`Foto de ${titulo}`} />
      ) : null}
      {!foto && iniciais ? (
        <span className="card-foto card-iniciais" aria-hidden="true">
          {iniciais}
        </span>
      ) : null}
      {etiqueta ? <span className="card-etiqueta">{etiqueta}</span> : null}
      <h3 className="card-titulo">{titulo}</h3>
      {papel ? <p className="card-papel">{papel}</p> : null}
      <p className="card-descricao">{descricao}</p>
    </>
  );

  if (para) {
    return (
      <Link className={classes.join(" ")} to={para}>
        {conteudo}
      </Link>
    );
  }

  return <article className={classes.join(" ")}>{conteudo}</article>;
}

export default Card;
