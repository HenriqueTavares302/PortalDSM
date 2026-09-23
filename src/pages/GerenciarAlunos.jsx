import { useEffect, useMemo, useRef, useState } from "react";
import MenuGerenciar from "../components/MenuGerenciar";
import Confirmacao from "../components/Confirmacao";
import useAuth from "../hooks/useAuth";
import {
  listarAlunos,
  criarAluno,
  atualizarAluno,
  removerAluno,
  enviarFoto,
  urlDaFoto,
} from "../services/api";

const formularioVazio = {
  nome: "",
  papel: "",
  descricao: "",
  iniciais: "",
  foto: "",
};

function GerenciarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState(null);
  const [paraApagar, setParaApagar] = useState(null);
  const [arquivo, setArquivo] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const campoArquivo = useRef(null);

  const { podeApagar } = useAuth();

  useEffect(() => {
    listarAlunos()
      .then((dados) => setAlunos(dados))
      .catch((erro) => setMensagem({ tipo: "erro", texto: erro.message }))
      .finally(() => setCarregando(false));
  }, []);

  const previaArquivo = useMemo(
    () => (arquivo ? URL.createObjectURL(arquivo) : null),
    [arquivo]
  );

  useEffect(() => {
    return () => {
      if (previaArquivo) URL.revokeObjectURL(previaArquivo);
    };
  }, [previaArquivo]);

  const previa = previaArquivo ?? urlDaFoto(formulario.foto);

  async function carregar() {
    const dados = await listarAlunos();
    setAlunos(dados);
  }

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  }

  function limpar() {
    setFormulario(formularioVazio);
    setEditandoId(null);
    setArquivo(null);
  }

  async function enviar(evento) {
    evento.preventDefault();
    setMensagem(null);
    setEnviando(true);

    try {
      let caminhoFoto = formulario.foto || null;

      if (arquivo) {
        caminhoFoto = await enviarFoto(arquivo);
      }

      const dados = { ...formulario, foto: caminhoFoto };

      if (editandoId) {
        await atualizarAluno(editandoId, dados);
        setMensagem({ tipo: "ok", texto: "Aluno atualizado." });
      } else {
        await criarAluno(dados);
        setMensagem({ tipo: "ok", texto: "Aluno cadastrado." });
      }

      limpar();
      await carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    } finally {
      setEnviando(false);
    }
  }

  function editar(aluno) {
    setEditandoId(aluno.id);
    setArquivo(null);
    setFormulario({
      nome: aluno.nome,
      papel: aluno.papel,
      descricao: aluno.descricao,
      iniciais: aluno.iniciais,
      foto: aluno.foto ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function apagar() {
    const aluno = paraApagar;
    setParaApagar(null);
    setMensagem(null);

    try {
      await removerAluno(aluno.id);
      setMensagem({ tipo: "ok", texto: "Aluno removido." });
      if (editandoId === aluno.id) limpar();
      await carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  return (
    <main className="container container-estreito">
      <h2 className="pagina-titulo">Gerenciar</h2>
      <MenuGerenciar />

      <p className="pagina-texto">
        Cadastro, edição e exclusão dos integrantes da equipe. As alterações são
        gravadas no banco pela API.
      </p>

      {mensagem ? (
        <p
          className={
            mensagem.tipo === "erro" ? "aviso aviso-erro" : "aviso aviso-ok"
          }
        >
          {mensagem.texto}
        </p>
      ) : null}

      <form className="formulario" onSubmit={enviar}>
        <h3 className="secao-titulo">
          {editandoId ? "Editando aluno" : "Novo aluno"}
        </h3>

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

        <div className="campo-duplo">
          <div className="campo">
            <label htmlFor="papel">Frente de trabalho</label>
            <input
              id="papel"
              name="papel"
              value={formulario.papel}
              onChange={alterarCampo}
              placeholder="Back-end"
              maxLength={40}
            />
          </div>

          <div className="campo">
            <label htmlFor="iniciais">Iniciais</label>
            <input
              id="iniciais"
              name="iniciais"
              value={formulario.iniciais}
              onChange={alterarCampo}
              placeholder="HA"
              maxLength={4}
            />
          </div>
        </div>

        <div className="campo">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            rows={3}
            value={formulario.descricao}
            onChange={alterarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="foto">Foto (opcional)</label>
          {previa ? (
            <img className="card-foto" src={previa} alt="Prévia da foto" />
          ) : null}
          <input
            id="foto"
            className="arquivo-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            ref={campoArquivo}
            onChange={(evento) => setArquivo(evento.target.files[0] ?? null)}
          />

          <div className="arquivo">
            <button
              type="button"
              className="botao botao-secundario"
              onClick={() => campoArquivo.current.click()}
            >
              {previa ? "Trocar imagem" : "Escolher imagem"}
            </button>

            <span className="arquivo-nome">
              {arquivo ? arquivo.name : "Nenhum arquivo escolhido"}
            </span>
          </div>

          <span className="campo-ajuda">
            JPG, PNG ou WEBP, até 2 MB. Em branco, o cartão mostra as iniciais.
          </span>
        </div>

        <div className="acoes">
          <button className="botao" type="submit" disabled={enviando}>
            {enviando
              ? "Salvando..."
              : editandoId
                ? "Salvar alterações"
                : "Cadastrar"}
          </button>
          {editandoId ? (
            <button
              className="botao botao-secundario"
              type="button"
              onClick={limpar}
            >
              Cancelar
            </button>
          ) : null}
        </div>
      </form>

      <h3 className="secao-titulo">Cadastrados</h3>

      {carregando ? (
        <p className="aviso">Carregando...</p>
      ) : (
        <div className="painel">
          {alunos.length === 0 ? (
            <p className="aviso">Nenhum aluno cadastrado.</p>
          ) : (
            alunos.map((aluno) => (
              <div className="linha" key={aluno.id}>
                <div>
                  <p className="linha-nome">{aluno.nome}</p>
                  <p className="linha-meta">{aluno.papel}</p>
                </div>
                <div className="acoes">
                  <button
                    className="botao-texto"
                    type="button"
                    onClick={() => editar(aluno)}
                  >
                    Editar
                  </button>
                  {podeApagar ? (
                    <button
                      className="botao-texto botao-perigo"
                      type="button"
                      onClick={() => setParaApagar(aluno)}
                    >
                      Apagar
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {paraApagar ? (
        <Confirmacao
          titulo="Apagar este aluno?"
          mensagem={`"${paraApagar.nome}" será removido do banco e sairá do portal. Esta ação não pode ser desfeita.`}
          rotuloConfirmar="Apagar"
          perigo
          aoConfirmar={apagar}
          aoCancelar={() => setParaApagar(null)}
        />
      ) : null}
    </main>
  );
}

export default GerenciarAlunos;