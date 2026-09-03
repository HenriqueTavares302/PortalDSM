import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RotaProtegida from "./components/RotaProtegida";
import Home from "./pages/Home";
import Alunos from "./pages/Alunos";
import Cursos from "./pages/Cursos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Gerenciar from "./pages/Gerenciar";
import GerenciarAlunos from "./pages/GerenciarAlunos";
import Entrar from "./pages/Entrar";
import Cadastrar from "./pages/Cadastrar";
import NaoEncontrada from "./pages/NaoEncontrada";

// Perfis que podem abrir a área de gerenciamento
const gestores = ["professor", "coordenador"];

function App() {
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <Navbar />
      <div className="conteudo" id="conteudo">
        <Routes>
          {/* Abertas */}
          <Route path="/entrar" element={<Entrar />} />
          <Route path="/cadastrar" element={<Cadastrar />} />

          {/* Exigem login */}
          <Route
            path="/"
            element={
              <RotaProtegida>
                <Home />
              </RotaProtegida>
            }
          />
          <Route
            path="/alunos"
            element={
              <RotaProtegida>
                <Alunos />
              </RotaProtegida>
            }
          />
          <Route
            path="/cursos"
            element={
              <RotaProtegida>
                <Cursos />
              </RotaProtegida>
            }
          />
          <Route
            path="/sobre"
            element={
              <RotaProtegida>
                <Sobre />
              </RotaProtegida>
            }
          />
          <Route
            path="/contato"
            element={
              <RotaProtegida>
                <Contato />
              </RotaProtegida>
            }
          />

          {/* Exigem login e perfil de gestor */}
          <Route
            path="/gerenciar"
            element={
              <RotaProtegida papeis={gestores}>
                <Gerenciar />
              </RotaProtegida>
            }
          />
          <Route
            path="/gerenciar/alunos"
            element={
              <RotaProtegida papeis={gestores}>
                <GerenciarAlunos />
              </RotaProtegida>
            }
          />

          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
