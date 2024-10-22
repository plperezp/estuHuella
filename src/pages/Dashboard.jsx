import React from 'react'
import NavBar from '../components/NavBar'
import '../css/dashboard.css'
import AnimationLogo from '../components/AnimationLogo'
import infoHuella from '../assets/huella-new.jpg'
import cambioHuella from '../assets/cambio-huella.jpg'
import estuhuella from '../assets/estuhuellaLogo.png'
import { Link } from 'react-router-dom'
import TravelCO2Calculator from '../components/TravelCO2Calculator'
import FadeInSection from '../components/FadeinSection'
import Footer from '../components/Footer'

function Dashboard() {
  return (
    <div className="home">
      <div className="home-container">
        <div className="overlay-home">
          <NavBar color={'#d1e2cd'} />
          <div style={{ height: '90%' }}>
            <AnimationLogo />
          </div>
        </div>
      </div>
      <div className="new">
        <FadeInSection>
          <div className="text-content">
            <h1>¿Qué es la Huella de Carbono?</h1>
            <p>
              La huella de carbono mide la cantidad de gases que emitimos y que
              calientan el planeta, como el <strong>CO2</strong>. Desde conducir
              un coche hasta usar electricidad, nuestras actividades diarias
              generan estos gases.
            </p>
            <h2>¿Por qué importa?</h2>
            <p>
              Conocer nuestra huella de carbono nos ayuda a entender cómo
              estamos contribuyendo al <strong>cambio climático</strong>.
              ¡Reducirla es clave para cuidar el planeta!
            </p>
            <h2>¿Qué podemos hacer?</h2>
            <ul>
              <li>Usa energía limpia</li>
              <li>Recicla más</li>
              <li>Reduce el uso de plásticos</li>
            </ul>
            <p>
              Pequeños cambios en tu día a día pueden hacer una{' '}
              <strong>gran diferencia</strong>.
            </p>
          </div>

          <div className="image-content">
            <img src={infoHuella} alt="Huella de Carbono" />
          </div>
        </FadeInSection>
      </div>
      <FadeInSection>
        <div className="opartunidad-box">
          <div
            className="overlay-arbol {
"
          >
            <div className="text-oportunidad">
              <h1 className="text-oportunidad">
                Esta es tu oportunidad de saber cuál es tu huella de carbono
              </h1>
            </div>

            <Link to="/huella">
              <div className="btn-oportunidad">
                <img
                  style={{ border: 'solid 5px white' }}
                  src={estuhuella}
                  alt="Logo"
                  className="logo-oprtunidad"
                />
                <h2>click me</h2>
              </div>
            </Link>
          </div>
        </div>
      </FadeInSection>
      <div className="new">
        <FadeInSection>
          <div className="image-content">
            <img
              src={cambioHuella}
              alt="Conciencia sobre la Huella de Carbono"
            />
          </div>
          <div className="text-content">
            <h1>Tu Impacto en el Planeta: ¡Reduce Tu Huella de Carbono!</h1>
            <p>
              Cada acción que realizamos, por pequeña que sea, tiene un impacto
              en el planeta. Desde encender una luz hasta comprar productos en
              línea, todas estas actividades generan{' '}
              <strong>emisiones de gases de efecto invernadero</strong>,
              contribuyendo al <strong>cambio climático</strong>.
            </p>
            <h2>¿Sabías que...?</h2>
            <ul>
              <li>
                Usar el coche para ir al trabajo emite más de{' '}
                <strong>4 toneladas de CO2</strong> al año.
              </li>
              <li>
                Dejar cargadores enchufados cuando no los usas también genera
                emisiones.
              </li>
              <li>
                Una ducha de 10 minutos puede consumir hasta{' '}
                <strong>150 litros de agua</strong>, cuyo calentamiento genera
                CO2.
              </li>
            </ul>
            <h2>¿Cómo puedes reducir tu huella de carbono?</h2>
            <ul>
              <li>
                <strong>Camina o usa la bicicleta</strong> en lugar del coche
                para trayectos cortos.
              </li>
              <li>
                <strong>Apaga luces y dispositivos</strong> cuando no los uses,
                y elige bombillas LED, que consumen menos energía.
              </li>
              <li>
                <strong>Opta por productos locales y ecológicos</strong> que
                requieren menos transporte y embalaje.
              </li>
              <li>
                <strong>Reduce el consumo de carne</strong>, ya que la
                producción ganadera es una de las principales fuentes de
                emisiones de CO2 y metano.
              </li>
            </ul>
            <p>
              Hacer pequeños ajustes en tu vida cotidiana puede reducir
              significativamente tu huella de carbono y ayudar a proteger el
              planeta para las futuras generaciones. Cada acción cuenta, y si
              todos ponemos de nuestra parte, ¡lograremos grandes cambios!
            </p>
          </div>
        </FadeInSection>
      </div>
      <div>{/*<TravelCO2Calculator />*/}</div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard
