import React from 'react'
import '../css/Footer.css'
import instagram from '../assets/instagram.png'
import facebook from '../assets/facebook.png'
import youtube from '../assets/youtube.png'
import { Link } from 'react-router-dom'
function Footer(props) {
  return (
    <div
      className="footer-container"
      style={{ backgroundImage: `url(${props.fondo})` }}
    >
      <div className="home-boton">
        <p> ES TU</p>
        <p>HUELLA</p>
      </div>
      <div className="devs-footer">
        <Link to={'https://github.com/Javitocatral'}>
          <p>Javier Gascon</p>
        </Link>
        <p>|</p>
        <Link to={'https://github.com/plperezp'}>
          <p>Pedro Perez</p>
        </Link>
      </div>
      <div className="socialMedia">
        <img src={instagram} />
        <img src={youtube} />
        <img src={facebook} />
      </div>
    </div>
  )
}

export default Footer
