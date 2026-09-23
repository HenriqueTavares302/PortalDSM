import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destino = path.join(__dirname, "..", "..", "public", "fotos");

const tiposAceitos = ["image/jpeg", "image/png", "image/webp"];

const armazenamento = multer.diskStorage({
  destination: (req, arquivo, callback) => {
    callback(null, destino);
  },
  filename: (req, arquivo, callback) => {
    const extensao = path.extname(arquivo.originalname).toLowerCase();
    const nome = crypto.randomBytes(16).toString("hex");
    callback(null, `${nome}${extensao}`);
  },
});

const upload = multer({
  storage: armazenamento,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, arquivo, callback) => {
    if (tiposAceitos.includes(arquivo.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Envie uma imagem JPG, PNG ou WEBP."));
    }
  },
});

export default upload;