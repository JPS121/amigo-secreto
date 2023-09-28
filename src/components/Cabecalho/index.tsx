import './style.css'

const Cabecalho = () => {
  return (
    <header className="cabecalho">
      <div className="imagem-logo" role="img" aria-label='Logo do sorteador'></div>
      <img src="/imagens/participante.png" alt="participante" />
    </header>
  )
}

export default Cabecalho