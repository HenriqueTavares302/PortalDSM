import { useEffect, useState } from "react";
import MenuGerenciar from "../components/MenuGerenciar";
import useAuth from "../hooks/useAuth";
import {
  listarAlunos,
  criarAluno,
  atualizarAluno,
  removerAluno,
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

  // Coordenador cria e edita, mas não apaga
  const { podeApagar } = useAuth();

  // Carga inicial da lista
  useEffect(() => {
    listarAlunos()
      .then((dados) => setAlunos(dados))
      .catch((erro) => setMensagem({ tipo: "erro", texto: erro.message }))
      .finally(() => setCarregando(false));
  }, []);

  // Recarrega a lista depois de cadastrar, editar ou apagar
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
  }

  async function enviar(evento) {
    evento.preventDefault();
    setMensagem(null);

    // O banco aceita foto nula; o campo vazio do formulário vira null
    const dados = { ...formulario, foto: formulario.foto.trim() || null };

    try {
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
    }
  }

  function editar(aluno) {
    setEditandoId(aluno.id);
    setFormulario({
      nome: aluno.nome,
      papel: aluno.papel,
      descricao: aluno.descricao,
      iniciais: aluno.iniciais,
      foto: aluno.foto ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function apagar(aluno) {
    const confirmou = window.confirm(`Apagar "${aluno.nome}"?`);
    if (!confirmou) return;

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
          <input
            id="foto"
            name="foto"
            value={formulario.foto}
            onChange={alterarCampo}
            placeholder="/fotos/henrique.jpg"
            maxLength={200}
          />
          <span className="campo-ajuda">
            Caminho de um arquivo dentro de server/public. Em branco, o cartão
            mostra as iniciais.
          </span>
        </div>

        <div className="acoes">
          <button className="botao" type="submit">
            {editandoId ? "Salvar alterações" : "Cadastrar"}
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
                      onClick={() => apagar(aluno)}
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
    </main>
  );
}

export default GerenciarAlunos;
