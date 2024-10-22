import React from 'react'
import '../css/NotFound.css'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <div className="es404contenedor">
        <div className="error-container">
          <span>
            <span>4</span>
          </span>
          <span>0</span>
          <span>
            <span>4</span>
          </span>
        </div>
        <div className="texto404">
          <h3>Oops! Página no encontrada 🌍</h3>
          <p>
            Parece que te has desviado del camino hacia una vida más sostenible.
            La página que buscas no existe o ha sido movida. Pero no te
            preocupes, ¡aún podemos ayudarte a reducir tu huella de carbono!
            Vuelve a la página principal para calcular tu huella de carbono y
            descubrir cómo puedes marcar la diferencia.
          </p>
        </div>
        <Link to={'/'}>
          <button className="btn404">Home</button>
        </Link>
      </div>
    </>
  )
}

export default NotFound
