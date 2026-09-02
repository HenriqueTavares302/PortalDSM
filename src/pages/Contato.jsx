import InfoItem from "../components/InfoItem";

function Contato() {
  return (
    <main className="container">
      <h2 className="pagina-titulo">Contato</h2>
      <p className="pagina-texto">
        Para falar sobre o projeto, procurar a equipe ou tirar dúvidas sobre o
        curso.
      </p>

      <div className="painel">
        <InfoItem rotulo="Instituição" valor="Fatec Matão" />
        <InfoItem
          rotulo="Curso"
          valor="Desenvolvimento de Software Multiplataforma"
        />
        <InfoItem rotulo="Turma" valor="4º semestre, DSM" />
        <InfoItem
          rotulo="E-mail"
          valor="henrique.andrade@aluno.cps.sp.gov.br"
          link="mailto:henrique.andrade@aluno.cps.sp.gov.br"
        />
        <InfoItem
          rotulo="Disciplina"
          valor="Laboratório de Desenvolvimento Web"
        />
      </div>
    </main>
  );
}

export default Contato;
