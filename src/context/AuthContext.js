import { createContext } from "react";

// Guarda o usuário logado e as funções de entrar e sair,
// disponíveis para qualquer componente sem precisar passar props.
export const AuthContext = createContext(null);
