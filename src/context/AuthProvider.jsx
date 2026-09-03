import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  entrar as entrarNaApi,
  registrar as registrarNaApi,
  usuarioAtual,
  guardarToken,
  apagarToken,
} from "../services/api";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Ao abrir o site, pergunta à API se o token guardado ainda vale
  useEffect(() => {
    usuarioAtual()
      .then((dados) => setUsuario(dados))
      .catch(() => setUsuario(null))
      .finally(() => setCarregando(false));
  }, []);

  async function entrar(email, senha) {
    const resposta = await entrarNaApi(email, senha);
    guardarToken(resposta.token);
    setUsuario(resposta.usuario);
    return resposta.usuario;
  }

  async function registrar(dados) {
    const resposta = await registrarNaApi(dados);
    guardarToken(resposta.token);
    setUsuario(resposta.usuario);
    return resposta.usuario;
  }

  function sair() {
    apagarToken();
    setUsuario(null);
  }

  // Atalhos usados pelas telas para decidir o que mostrar.
  // Importante: isso é só interface. Quem bloqueia de verdade é a API.
  const podeEscrever =
    usuario?.papel === "professor" || usuario?.papel === "coordenador";
  const podeApagar = usuario?.papel === "professor";

  const valor = {
    usuario,
    carregando,
    entrar,
    registrar,
    sair,
    podeEscrever,
    podeApagar,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
