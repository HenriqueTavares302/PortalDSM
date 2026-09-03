import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsuarioModel from "../models/UsuarioModel.js";

const VALIDADE_TOKEN = "8h";

// O papel é declarado pelo usuário, mas conferido pelo servidor.
// Aluno é livre; professor e coordenador exigem o código guardado no .env.
function papelPermitido(papel, codigo) {
  if (papel === "aluno") return true;
  if (papel === "professor") return codigo === process.env.CODIGO_PROFESSOR;
  if (papel === "coordenador") return codigo === process.env.CODIGO_COORDENADOR;
  return false;
}

function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, papel: usuario.papel },
    process.env.JWT_SEGREDO,
    { expiresIn: VALIDADE_TOKEN }
  );
}

const AuthController = {
  async registrar(req, res, next) {
    try {
      const { nome, email, senha, papel, codigo } = req.body;

      if (!nome || !email || !senha || !papel) {
        return res
          .status(400)
          .json({ erro: "Nome, e-mail, senha e perfil são obrigatórios." });
      }

      if (senha.length < 8) {
        return res
          .status(400)
          .json({ erro: "A senha precisa ter pelo menos 8 caracteres." });
      }

      if (!["professor", "coordenador", "aluno"].includes(papel)) {
        return res.status(400).json({ erro: "Perfil inválido." });
      }

      if (!papelPermitido(papel, codigo)) {
        return res
          .status(403)
          .json({ erro: "Código de convite inválido para este perfil." });
      }

      const jaExiste = await UsuarioModel.buscarPorEmail(email);
      if (jaExiste) {
        return res.status(409).json({ erro: "Este e-mail já está cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const usuario = await UsuarioModel.criar({
        nome,
        email,
        senhaHash,
        papel,
      });

      res.status(201).json({ usuario, token: gerarToken(usuario) });
    } catch (erro) {
      next(erro);
    }
  },

  async entrar(req, res, next) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: "Informe e-mail e senha." });
      }

      const usuario = await UsuarioModel.buscarPorEmail(email);

      // Mesma mensagem para e-mail inexistente e senha errada:
      // não entregamos a quem tenta adivinhar quais e-mails existem
      const senhaConfere =
        usuario && (await bcrypt.compare(senha, usuario.senha));

      if (!senhaConfere) {
        return res.status(401).json({ erro: "E-mail ou senha incorretos." });
      }

      const dados = UsuarioModel.semSenha(usuario);
      res.json({ usuario: dados, token: gerarToken(dados) });
    } catch (erro) {
      next(erro);
    }
  },

  // Usado pelo front na abertura do site, para saber se o token ainda vale
  async eu(req, res, next) {
    try {
      const usuario = await UsuarioModel.buscarPorId(req.usuario.id);
      if (!usuario) {
        return res.status(401).json({ erro: "Usuário não encontrado." });
      }
      res.json(usuario);
    } catch (erro) {
      next(erro);
    }
  },
};

export default AuthController;
