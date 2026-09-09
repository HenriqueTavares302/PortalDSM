import { useState } from "react";

function IconeOlho() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconeOlhoCortado() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M10.6 6.1A9.9 9.9 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a17.7 17.7 0 0 1-3.4 4.2" />
      <path d="M6.4 7.9A17.4 17.4 0 0 0 2 12s3.6 6.5 10 6.5a9.9 9.9 0 0 0 4-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  );
}

function CampoSenha({
  id = "senha",
  name = "senha",
  rotulo = "Senha",
  valor,
  aoAlterar,
  autoComplete = "current-password",
  ajuda,
}) {
  const [visivel, setVisivel] = useState(false);

  return (
    <div className="campo">
      <label htmlFor={id}>{rotulo}</label>

      <div className="campo-senha">
        <input
          id={id}
          name={name}
          type={visivel ? "text" : "password"}
          autoComplete={autoComplete}
          value={valor}
          onChange={aoAlterar}
        />
        <button
          type="button"
          className="campo-senha-botao"
          onClick={() => setVisivel((anterior) => !anterior)}
          aria-pressed={visivel}
          aria-label={visivel ? "Ocultar a senha" : "Mostrar a senha"}
          title={visivel ? "Ocultar a senha" : "Mostrar a senha"}
        >
          {visivel ? <IconeOlhoCortado /> : <IconeOlho />}
        </button>
      </div>

      {ajuda ? <span className="campo-ajuda">{ajuda}</span> : null}
    </div>
  );
}

export default CampoSenha;
