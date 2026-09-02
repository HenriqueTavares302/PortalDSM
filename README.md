# Portal DSM

Portal do 4º semestre de Desenvolvimento de Software Multiplataforma da Fatec Matão.
A aplicação reúne as disciplinas do semestre, a equipe do projeto integrador e os
contatos do curso em uma interface própria, navegável e responsiva.

Projeto desenvolvido na disciplina de **Laboratório de Desenvolvimento Web**, sob
orientação do professor Marivaldo Alcantara.

## Tecnologias

- **React 19** para a construção da interface
- **Vite 8** como ambiente de desenvolvimento e build
- **React Router 8** para a navegação entre páginas
- **CSS puro**, com variáveis e media queries para a responsividade

Nenhuma biblioteca de componentes ou de estilo foi usada.

## Como rodar

Requer Node.js instalado.

```bash
git clone https://github.com/HenriqueTavares302/PortalDSM.git
cd PortalDSM
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173/`.

Outros comandos disponíveis:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a versão de produção localmente
npm run lint      # verifica o código com ESLint
```

## Rotas

| Caminho     | Página            | Conteúdo                                          |
| ----------- | ----------------- | ------------------------------------------------- |
| `/`         | Início            | Apresentação, etapas do projeto e atalhos          |
| `/alunos`   | Alunos            | Integrantes da equipe e a frente de trabalho de cada um |
| `/cursos`   | Disciplinas       | As seis matérias do semestre, agrupadas por área    |
| `/sobre`    | Sobre             | Descrição do projeto e da organização do código     |
| `/contato`  | Contato           | Dados de contato da equipe e do curso               |
| qualquer outro | Não encontrada | Rota curinga com retorno para o início             |

## Estrutura do projeto

```
portal-dsm/
├── public/
├── src/
│   ├── assets/           imagens usadas pelas páginas
│   ├── components/       partes reutilizáveis da interface
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── InfoItem.jsx
│   │   └── Navbar.jsx
│   ├── data/
│   │   └── dados.js      conteúdo das páginas, separado da apresentação
│   ├── pages/            uma tela para cada rota
│   │   ├── Alunos.jsx
│   │   ├── Contato.jsx
│   │   ├── Cursos.jsx
│   │   ├── Home.jsx
│   │   ├── NaoEncontrada.jsx
│   │   └── Sobre.jsx
│   ├── App.jsx           layout fixo e definição das rotas
│   ├── index.css         estilos globais, paleta e responsividade
│   └── main.jsx          ponto de entrada e BrowserRouter
├── index.html
├── package.json
└── vite.config.js
```

## Decisões de organização

**Componentes recebem conteúdo por props.** O mesmo `Card` é usado para as
disciplinas, para os integrantes da equipe e para os atalhos da página inicial.
O que muda entre um caso e outro são as props: `foto`, `papel`, `area`,
`etiqueta` e `para`.

**Os dados ficam fora das páginas.** As disciplinas e os integrantes estão em
`src/data/dados.js`, e as páginas apenas percorrem esses arrays. Na etapa
seguinte da disciplina esse arquivo será substituído por respostas de uma API
em Node.js com Express, sem que as páginas precisem mudar de estrutura.

**A cor carrega informação.** A faixa à esquerda de cada cartão de disciplina
indica a área a que ela pertence: Web, Mobile, Dados ou Processo.

**Responsividade em três faixas.** Três colunas no computador, duas no tablet
(até 1024px) e uma no celular (até 768px), com o cabeçalho e o menu se
reorganizando junto.

## Acessibilidade

- Link "pular para o conteúdo" para navegação por teclado
- Contorno de foco visível em links e botões
- Imagens com texto alternativo
- `prefers-reduced-motion` respeitado

## Próxima etapa

Substituir os dados estáticos por uma API em Node.js com Express, conectada a um
banco de dados, mantendo a mesma estrutura de páginas e componentes.

---

Henrique Tavares Andrade — 4º DSM, Fatec Matão