function Article({ titulo, autor, data, dataFormatada, conteudo, imagem }) {
  return (
    <article className="post">
      <h2>{titulo}</h2>
      <p className="meta-post">
        Por <strong>{autor}</strong> &mdash;{' '}
        <time dateTime={data}>{dataFormatada}</time>
      </p>

      {conteudo.map((paragrafo, index) => (
        <p key={index}>{paragrafo}</p>
      ))}

      <figure>
        <img src={imagem.src} alt={imagem.alt} />
        <figcaption>{imagem.legenda}</figcaption>
      </figure>
    </article>
  )
}

export default Article