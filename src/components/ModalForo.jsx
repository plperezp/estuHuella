import '../css/foroModal.css'
const ModalForo = ({
  esEditar,
  handleSubmitEditar,
  handleSubmitCrear,
  isOpen,
  setIsOpen,
  title,
  text,
  setTitle,
  setText,
  setEsEditar,
}) => {
  const handleTitleOnChange = (e) => {
    setTitle(e.target.value)
  }

  const handleTextOnChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (esEditar) {
      handleSubmitEditar(e)
    } else {
      handleSubmitCrear(e)
    }
    setIsOpen(false)

    setTitle('')
    setText('')
  }
  const handleAbrir = () => {
    setIsOpen(true)
    setEsEditar(false)
    setTitle('')
    setText('')
  }

  return (
    <div>
      <button onClick={handleAbrir}>abrir</button>
      {isOpen && (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsOpen(false)}>
              X
            </span>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Título:</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleOnChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>

              <div>
                <label>Descripción:</label>
                <textarea
                  value={text}
                  onChange={handleTextOnChange}
                  required
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '8px',
                    marginBottom: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {esEditar ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalForo
