import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Alunos from "./pages/Alunos";
import Cursos from "./pages/Cursos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NaoEncontrada from "./pages/NaoEncontrada";

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
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
