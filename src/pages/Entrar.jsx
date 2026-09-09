import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import CampoSenha from "../components/CampoSenha";

function Entrar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const { entrar } = useAuth();
  const navegar = useNavigate();
  const local = useLocation();

  const destino = local.state?.de ?? "/";

  async function enviar(evento) {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await entrar(email, senha);
      navegar(destino, { replace: true });
    } catch (falha) {
      setErro(falha.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="container container-estreito">
      <h2 className="pagina-titulo">Entrar</h2>
      <p className="pagina-texto">
        O Portal DSM é restrito aos integrantes do curso.
      </p>

      {erro ? <p className="aviso aviso-erro">{erro}</p> : null}

      <form className="formulario" onSubmit={enviar}>
        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <CampoSenha
          valor={senha}
          aoAlterar={(evento) => setSenha(evento.target.value)}
        />

        <div className="acoes">
          <button className="botao" type="submit" disabled={enviando}>
            {enviando ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>

      <p className="pagina-texto">
        Ainda não tem conta? <Link to="/cadastrar">Cadastre-se</Link>.
      </p>
    </main>
  );
}

export default Entrar;
