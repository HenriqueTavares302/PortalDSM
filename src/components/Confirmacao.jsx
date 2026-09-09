import { useEffect, useRef } from "react";

function Confirmacao({
  titulo,
  mensagem,
  rotuloConfirmar = "Confirmar",
  rotuloCancelar = "Cancelar",
  perigo = false,
  aoConfirmar,
  aoCancelar,
}) {
  const botaoCancelar = useRef(null);

  useEffect(() => {
    // Começa com o foco no botão menos destrutivo
    botaoCancelar.current?.focus();

    function aoPressionar(evento) {
      if (evento.key === "Escape") aoCancelar();
    }

    document.addEventListener("keydown", aoPressionar);
    return () => document.removeEventListener("keydown", aoPressionar);
  }, [aoCancelar]);

  return (
    <div className="modal-fundo" onClick={aoCancelar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <h2 className="modal-titulo" id="modal-titulo">
          {titulo}
        </h2>

        {mensagem ? <p className="modal-texto">{mensagem}</p> : null}

        <div className="modal-acoes">
          <button
            className="botao botao-secundario"
            type="button"
            ref={botaoCancelar}
            onClick={aoCancelar}
          >
            {rotuloCancelar}
          </button>
          <button
            className={perigo ? "botao botao-destrutivo" : "botao"}
            type="button"
            onClick={aoConfirmar}
          >
            {rotuloConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmacao;
