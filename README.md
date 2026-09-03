# Portal DSM

Portal do 4º semestre de Desenvolvimento de Software Multiplataforma da Fatec
Matão. Reúne as disciplinas do semestre e a equipe do projeto integrador, com
área administrativa protegida por login e permissões por perfil.

Projeto desenvolvido na disciplina de **Laboratório de Desenvolvimento Web**,
sob orientação do professor Marivaldo Alcantara.

## Tecnologias

**Front-end**

- React 19
- Vite 8
- React Router 8
- CSS puro, com variáveis e media queries

**Back-end**

- Node.js com Express 5
- MySQL 8 com o driver mysql2
- bcryptjs para hash de senha
- jsonwebtoken para autenticação

Nenhuma biblioteca de componentes ou de estilo foi usada no front.

## Como rodar

### 1. Pré-requisitos

- Node.js
- MySQL 8 em execução

### 2. Clonar e instalar

```bash
git clone https://github.com/HenriqueTavares302/PortalDSM.git
cd PortalDSM
npm install
cd server
npm install
```

### 3. Criar o banco

No MySQL Workbench ou no cliente de sua preferência:

```sql
CREATE DATABASE portal_dsm
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

O `utf8mb4` é necessário para que acentos e cedilha sejam gravados
corretamente.

### 4. Configurar as variáveis de ambiente

Dentro de `server`, copie `.env.example` para `.env` e preencha:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD="sua_senha"
DB_NAME=portal_dsm
PORT=3001

JWT_SEGREDO=um_texto_longo_e_aleatorio
CODIGO_PROFESSOR=um_codigo
CODIGO_COORDENADOR=outro_codigo
```

Use aspas na senha se ela contiver `#`, porque nesse arquivo o `#` inicia um
comentário. Para gerar um segredo aleatório:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

O `.env` não é versionado. O `.env.example` serve de modelo.

### 5. Criar as tabelas e os dados iniciais

```bash
cd server
npm run seed
```

O seed cria as tabelas, insere as disciplinas e os alunos e cadastra as contas
de demonstração. Rodá-lo de novo não duplica nada: ele só insere em tabela
vazia.

### 6. Subir os dois servidores

São necessários dois terminais, um para cada parte.

```bash
# Terminal 1 — API
cd server
npm run dev        # http://localhost:3001
```

```bash
# Terminal 2 — front-end
npm run dev        # http://localhost:5173
```

Acesse http://localhost:5173

## Contas de demonstração

Criadas pelo seed, para permitir a avaliação do projeto sem cadastro manual.

| E-mail                      | Senha          | Perfil      |
| --------------------------- | -------------- | ----------- |
| professor@portaldsm.local   | professor123   | professor   |
| coordenador@portaldsm.local | coordenador123 | coordenador |
| aluno@portaldsm.local       | aluno123456    | aluno       |

São contas de teste, com senhas propositalmente simples. Não devem existir fora
de um ambiente de desenvolvimento.

## Perfis e permissões

| Ação                       | professor | coordenador | aluno |
| -------------------------- | :-------: | :---------: | :---: |
| Ver o portal               |    sim    |     sim     |  sim  |
| Criar disciplina ou aluno  |    sim    |     sim     |  não  |
| Editar                     |    sim    |     sim     |  não  |
| Apagar                     |    sim    |     não     |  não  |

Nenhuma rota de dados responde sem autenticação. As únicas rotas abertas são as
de cadastro e login.

A verificação acontece no servidor, em middlewares aplicados às rotas. O
front-end esconde botões que o perfil não pode usar, mas isso é apenas
conveniência de interface: um `DELETE` enviado diretamente à API com um token de
coordenador recebe 403.

### Códigos de convite

No cadastro, o usuário escolhe o perfil. Contas de aluno são criadas
imediatamente. Professor e coordenador exigem o código correspondente,
armazenado apenas no `.env` do servidor e conferido no `AuthController`. O
código não trafega para o navegador.

## Rotas da aplicação

| Caminho             | Página           | Acesso                 |
| ------------------- | ---------------- | ---------------------- |
| `/entrar`           | Login            | aberto                 |
| `/cadastrar`        | Criar conta      | aberto                 |
| `/`                 | Início           | autenticado            |
| `/alunos`           | Alunos           | autenticado            |
| `/cursos`           | Disciplinas      | autenticado            |
| `/sobre`            | Sobre            | autenticado            |
| `/contato`          | Contato          | autenticado            |
| `/gerenciar`        | CRUD disciplinas | professor, coordenador |
| `/gerenciar/alunos` | CRUD alunos      | professor, coordenador |
| qualquer outro      | Não encontrada   | aberto                 |

## Endpoints da API

Base: `http://localhost:3001`

### Autenticação

| Método | Caminho               | Corpo                                |
| ------ | --------------------- | ------------------------------------ |
| POST   | `/api/auth/registrar` | nome, email, senha, papel, codigo    |
| POST   | `/api/auth/entrar`    | email, senha                         |
| GET    | `/api/auth/eu`        | exige token, devolve o usuário atual |

O login devolve `{ usuario, token }`. O token vai nas demais requisições no
cabeçalho `Authorization: Bearer <token>` e vale 8 horas.

### Disciplinas e alunos

| Método | Caminho                | Perfis permitidos      |
| ------ | ---------------------- | ---------------------- |
| GET    | `/api/disciplinas`     | qualquer autenticado   |
| GET    | `/api/disciplinas/:id` | qualquer autenticado   |
| POST   | `/api/disciplinas`     | professor, coordenador |
| PUT    | `/api/disciplinas/:id` | professor, coordenador |
| DELETE | `/api/disciplinas/:id` | professor              |

Os mesmos cinco existem para `/api/alunos`.

## Estrutura do projeto

```
PortalDSM/
├── server/                     API
│   ├── public/fotos/           imagens servidas estaticamente
│   └── src/
│       ├── controllers/        recebem a requisição e validam
│       ├── database/           conexão, criação de tabelas e seed
│       ├── middlewares/        autenticar e autorizar
│       ├── models/             acesso ao banco, onde fica o SQL
│       ├── routes/index.js     mapeia caminhos e permissões
│       └── server.js           sobe o Express
├── src/                        front-end
│   ├── components/             partes reutilizáveis da interface
│   ├── context/                estado de autenticação
│   ├── hooks/                  useAuth
│   ├── pages/                  uma tela por rota
│   ├── services/api.js         todas as chamadas à API
│   ├── App.jsx                 layout fixo e rotas
│   ├── index.css               estilos globais e responsividade
│   └── main.jsx                ponto de entrada
├── index.html
└── package.json
```

## Decisões de projeto

**O SQL fica isolado nos models.** Os controllers não sabem qual banco está por
trás. A primeira versão do projeto usava SQLite; a migração para MySQL trocou o
driver e tornou os models assíncronos, sem alterar controllers nem rotas.

**A política de segurança é legível nas rotas.** Cada rota declara os
middlewares que a protegem, então `routes/index.js` mostra a permissão de todos
os endpoints em uma tela.

**Componentes recebem conteúdo por props.** O mesmo `Card` é usado para
disciplinas, integrantes da equipe e atalhos da página inicial, variando pelas
props `foto`, `papel`, `area`, `etiqueta` e `para`.

**A cor carrega informação.** A faixa à esquerda dos cartões de disciplina
indica a área: Web, Mobile, Dados ou Processo.

**Responsividade em três faixas.** Três colunas no computador, duas no tablet
(até 1024px) e uma no celular (até 768px).

**Senhas nunca são armazenadas em texto.** O `bcryptjs` gera um hash com salt
por usuário, e o login compara hashes. Não há como recuperar a senha original a
partir do banco.

## Acessibilidade

- Link "pular para o conteúdo" para navegação por teclado
- Contorno de foco visível em links, campos e botões
- Imagens com texto alternativo
- `prefers-reduced-motion` respeitado

## Verificação

```bash
npm run lint
npm run build
```

Ambos devem terminar sem mensagens de erro.

## Limitações conhecidas

- Não há upload de imagem: o campo de foto recebe o caminho de um arquivo já
  presente em `server/public`
- Não há recuperação de senha
- O token fica no `localStorage`, escolha adequada a um projeto acadêmico mas
  não à exposição pública
- As tabelas `usuarios` e `alunos` são independentes: uma conta de login não
  está vinculada a um integrante exibido no portal

---

Henrique Tavares Andrade — 4º DSM, Fatec Matão