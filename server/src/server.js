import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import rotas from "./routes/index.js";
import criarTabelas from "./database/criarTabelas.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORTA = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", rotas);

// Caminho que não bateu com nenhuma rota acima
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

// Tratador de erros: qualquer next(erro) dos controllers cai aqui
app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(500).json({ erro: "Erro interno no servidor." });
});

async function iniciar() {
  try {
    await criarTabelas();
    app.listen(PORTA, () => {
      console.log(`API do Portal DSM rodando em http://localhost:${PORTA}`);
    });
  } catch (erro) {
    console.error("Não foi possível conectar ao MySQL:", erro.message);
    process.exit(1);
  }
}

iniciar();
