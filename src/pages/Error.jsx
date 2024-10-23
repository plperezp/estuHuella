import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Error500.css'
import img from '../assets/error500.jpg'
const Error = () => {
  return (
    <div className="error-container">
      <h2>Error 500</h2>
      <p>
        ¡Vaya! Parece que algo no ha salido como esperábamos. Nuestro equipo ya
        está trabajando para resolverlo, por favor, vuelve a intentarlo en unos
        minutos.
      </p>

      <div
        className="img500"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <img src={img} />
      </div>

      <Link to="/" className="error-link">
        Volver a la página de inicio
      </Link>
    </div>
  )
}

export default Error
