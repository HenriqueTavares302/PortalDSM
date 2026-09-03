import { useEffect, useState } from "react";
import MenuGerenciar from "../components/MenuGerenciar";
import useAuth from "../hooks/useAuth";
import {
  listarDisciplinas,
  criarDisciplina,
  atualizarDisciplina,
  removerDisciplina,
} from "../services/api";

const formularioVazio = {
  nome: "",
  area: "web",
  areaNome: "Web",
  descricao: "",
  carga: "",
};

const areas = [
  { valor: "web", rotulo: "Web" },
  { valor: "mobile", rotulo: "Mobile" },
  { valor: "dados", rotulo: "Dados" },
  { valor: "processo", rotulo: "Processo" },
];

function Gerenciar() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState(null);

  // Coordenador cria e edita, mas não apaga
  const { podeApagar } = useAuth();

  // Carga inicial da lista
  useEffect(() => {
    listarDisciplinas()
      .then((dados) => setDisciplinas(dados))
      .catch((erro) => setMensagem({ tipo: "erro", texto: erro.message }))
      .finally(() => setCarregando(false));
  }, []);

  // Recarrega a lista depois de cadastrar, editar ou apagar
  async function carregar() {
    const dados = await listarDisciplinas();
    setDisciplinas(dados);
  }

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  }

  function alterarArea(evento) {
    const valor = evento.target.value;
    const area = areas.find((a) => a.valor === valor);
    setFormulario((anterior) => ({
      ...anterior,
      area: valor,
      areaNome: area.rotulo,
    }));
  }

  function limpar() {
    setFormulario(formularioVazio);
    setEditandoId(null);
  }

  async function enviar(evento) {
    evento.preventDefault();
    setMensagem(null);

    try {
      if (editandoId) {
        await atualizarDisciplina(editandoId, formulario);
        setMensagem({ tipo: "ok", texto: "Disciplina atualizada." });
      } else {
        await criarDisciplina(formulario);
        setMensagem({ tipo: "ok", texto: "Disciplina cadastrada." });
      }
      limpar();
      await carregar();
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro.message });
    }
  }

  function editar(disciplina) {
    setEditandoId(disciplina.id);
    setFormulario({
      nome: disciplina.nome,
      area: disciplina.area,
      areaNome: disciplina.areaNome,
      descricao: disciplina.descricao,
      carga: disciplina.carga,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function apagar(disciplina) {
    const confirmou = window.confirm(`Apagar "${disciplina.nome}"?`);
    if (!confirmou) return;

    setMensagem(null);
    try {
      await removerDisciplina(disciplina.id);
      setMensagem({ tipo: "ok", texto: "Disciplina removida." });
      if (editandoId === disciplina.id) limpar();
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
        Cadastro, edição e exclusão das disciplinas exibidas no portal. As
        alterações são gravadas no banco pela API.
      </p>

      {mensagem ? (
        <p className={mensagem.tipo === "erro" ? "aviso aviso-erro" : "aviso aviso-ok"}>
          {mensagem.texto}
        </p>
      ) : null}

      <form className="formulario" onSubmit={enviar}>
        <h3 className="secao-titulo">
          {editandoId ? "Editando disciplina" : "Nova disciplina"}
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
            <label htmlFor="area">Área</label>
            <select id="area" name="area" value={formulario.area} onChange={alterarArea}>
              {areas.map((area) => (
                <option key={area.valor} value={area.valor}>
                  {area.rotulo}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="carga">Carga horária</label>
            <input
              id="carga"
              name="carga"
              value={formulario.carga}
              onChange={alterarCampo}
              placeholder="80 h"
              maxLength={20}
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

        <div className="acoes">
          <button className="botao" type="submit">
            {editandoId ? "Salvar alterações" : "Cadastrar"}
          </button>
          {editandoId ? (
            <button className="botao botao-secundario" type="button" onClick={limpar}>
              Cancelar
            </button>
          ) : null}
        </div>
      </form>

      <h3 className="secao-titulo">Cadastradas</h3>

      {carregando ? (
        <p className="aviso">Carregando...</p>
      ) : (
        <div className="painel">
          {disciplinas.length === 0 ? (
            <p className="aviso">Nenhuma disciplina cadastrada.</p>
          ) : (
            disciplinas.map((disciplina) => (
              <div className="linha" key={disciplina.id}>
                <div>
                  <p className="linha-nome">{disciplina.nome}</p>
                  <p className="linha-meta">
                    {disciplina.areaNome}, {disciplina.carga}
                  </p>
                </div>
                <div className="acoes">
                  <button
                    className="botao-texto"
                    type="button"
                    onClick={() => editar(disciplina)}
                  >
                    Editar
                  </button>
                  {podeApagar ? (
                    <button
                      className="botao-texto botao-perigo"
                      type="button"
                      onClick={() => apagar(disciplina)}
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

export default Gerenciar;
