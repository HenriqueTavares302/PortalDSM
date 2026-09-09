import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import CampoSenha from "../components/CampoSenha";

const perfis = [
  { valor: "aluno", rotulo: "Aluno" },
  { valor: "coordenador", rotulo: "Coordenador" },
  { valor: "professor", rotulo: "Professor" },
];

const formularioVazio = {
  nome: "",
  email: "",
  senha: "",
  papel: "aluno",
  codigo: "",
};

function Cadastrar() {
  const [formulario, setFormulario] = useState(formularioVazio);
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const { registrar } = useAuth();
  const navegar = useNavigate();

  const exigeCodigo = formulario.papel !== "aluno";

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await registrar(formulario);
      navegar("/", { replace: true });
    } catch (falha) {
      setErro(falha.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="container container-estreito">
      <h2 className="pagina-titulo">Criar conta</h2>
      <p className="pagina-texto">
        Contas de aluno são liberadas na hora. Professor e coordenador precisam
        do código de convite fornecido pela coordenação.
      </p>

      {erro ? <p className="aviso aviso-erro">{erro}</p> : null}

      <form className="formulario" onSubmit={enviar}>
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            value={formulario.nome}
            onChange={alterarCampo}
            maxLength={120}
          />
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formulario.email}
            onChange={alterarCampo}
            maxLength={160}
          />
        </div>

        <CampoSenha
          valor={formulario.senha}
          aoAlterar={alterarCampo}
          autoComplete="new-password"
          ajuda="Pelo menos 8 caracteres."
        />

        <div className="campo">
          <label htmlFor="papel">Perfil</label>
          <select
            id="papel"
            name="papel"
            value={formulario.papel}
            onChange={alterarCampo}
          >
            {perfis.map((perfil) => (
              <option key={perfil.valor} value={perfil.valor}>
                {perfil.rotulo}
              </option>
            ))}
          </select>
        </div>

        {exigeCodigo ? (
          <div className="campo">
            <label htmlFor="codigo">Código de convite</label>
            <input
              id="codigo"
              name="codigo"
              value={formulario.codigo}
              onChange={alterarCampo}
            />
            <span className="campo-ajuda">
              O código é conferido no servidor, não no navegador.
            </span>
          </div>
        ) : null}

        <div className="acoes">
          <button className="botao" type="submit" disabled={enviando}>
            {enviando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>

      <p className="pagina-texto">
        Já tem conta? <Link to="/entrar">Entrar</Link>.
      </p>
    </main>
  );
}

export default Cadastrar;
