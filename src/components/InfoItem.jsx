function InfoItem({ rotulo, valor, link }) {
  return (
    <div className="info-item">
      <span className="info-rotulo">{rotulo}</span>
      <span className="info-valor">
        {link ? <a href={link}>{valor}</a> : valor}
      </span>
    </div>
  );
}

export default InfoItem;
