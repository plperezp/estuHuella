import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import services from '../services/config'
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'
import '../css/formtuhuella.css'
import CalculoHuella from '../components/CalculoHuella'
const cards = [
  { title: 'transporte 1', content: 'Esta es la primer transporte.' },
  { title: 'transporte 2', content: 'Esta es la segundo transporte.' },
  { title: 'transporte 3', content: 'Esta es la tercero transporte.' },
  { title: 'transporte 4', content: 'Esta es la cuarto transporte.' },
  { title: 'transporte 5', content: 'Esta es la quinto transporte.' },
  { title: 'transporte 6', content: 'Esta es la sexto transporte.' },
  { title: 'transporte 7', content: 'Esta es la séptimo transporte.' },
  { title: 'transporte 8', content: 'Esta es la octavo transporte.' },
  { title: 'transporte 9', content: 'Esta es la noveno transporte.' },
  { title: 'transporte 10', content: 'Esta es la décimo carta.' },
]

function FormTuHuella() {
  const navigate = useNavigate()
  const params = useParams()
  const [vehiculo, setVehiculo] = useState('')
  const [tiempo, setTiempo] = useState(0)
  const [motor, setMotor] = useState('')
  const [alimento, setAlimento] = useState('')
  const [cantidad, setCantidad] = useState(0)
  const [esDeProximidad, setEsDeProximidad] = useState(false)
  const [consumoEnergetico, setConsumoEnergetico] = useState('')
  const [esRenovable, setEsRenovable] = useState(false)
  const [recicla, setRecicla] = useState(false)
  const [errorMessage, setErrorMesage] = useState('')
  const { loggedUserId } = useContext(AuthContext)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleOnChangeVehiculo = (e) => {
    setVehiculo(e.target.value)
  }
  const handleOnChangeTiempo = (e) => {
    setTiempo(e.target.value)
  }
  const handleOnChangeMotor = (e) => {
    setMotor(e.target.value)
  }
  const handleOnChangeAlimento = (e) => {
    setAlimento(e.target.value)
  }
  const handleOnChangeCantidad = (e) => {
    setCantidad(e.target.value)
  }
  const handleOnChangeEsDeProximidad = (e) => {
    setEsDeProximidad(!esDeProximidad)
  }
  const handleOnChangeConsumoEnergetico = (e) => {
    setConsumoEnergetico(e.target.value)
  }
  const handleOnChangeRecicla = (e) => {
    setRecicla(!recicla)
  }
  const handleOnChangeEsRenovable = (e) => {
    setEsRenovable(!esRenovable)
  }

  const handleFormTransporteSubmit = async (e) => {
    e.preventDefault()
    try {
      const formTransport = {
        transporte: {
          vehiculo,
          tiempo,
          motor,
        },
      }
      await services.post(`/huella/transporte`, formTransport)
      console.log('Añadido correctamente')
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      alert('Has completado todas las cartas!')
    }
  }

  const handleFormOtrosSubmit = async (e) => {
    console.log()
    e.preventDefault()
    try {
      const formOtros = {
        otros: {
          consumoEnergetico,
          esRenovable,
          recicla,
        },
        user: loggedUserId,
      }
      await services.post('/huella/otros', formOtros)
      console.log('Añadido correctamente')
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  const handleFormAlimentacionSubmit = async (e) => {
    e.preventDefault()
    try {
      const formAlimentacion = {
        alimentacion: {
          alimento,
          cantidad,
          esDeProximidad,
        },
        user: loggedUserId,
      }

      await services.post('/huella/alimentacion', formAlimentacion)
      console.log('Añadido correctamente')
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  const handleNextCard = () => {
    // Iniciar animación de salida
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length)

      // Iniciar animación de entrada después del cambio de carta
      setTimeout(() => {
        setIsAnimating(false)
      }, 300) // Tiempo de la animación de entrada
    }, 300) // Tiempo de la animación de salida
  }
  return (
    <div className="formtuhuella-container">
      <div className="overlay-form">
        <NavBar color={'#4e7294'} />
        <div className="card-container">
          <div className={`card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <h2>{cards[currentCardIndex].title}</h2>
            <p>{cards[currentCardIndex].content}</p>

            <form
              onSubmit={handleFormTransporteSubmit}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                background: '#4e7294',
                padding: '20px',
                gap: '20px',
                marginTop: '20px',
                width: '100%',
              }}
            >
              <label>Medio de transporte:</label>
              <select
                onChange={handleOnChangeVehiculo}
                name="transportes"
                multiple
                required
              >
                <option value="">--Selecciona una opción--</option>
                <option value="coche">Coche</option>
                <option value="autobús">Autobús</option>
                <option value="tren">Tren</option>
                <option value="metro">Metro</option>
                <option value="bicicleta">Bicicleta</option>
                <option value="caminar">Caminar</option>
              </select>

              <label>Tiempo (minutos):</label>
              <input
                type="number"
                name="tiempo"
                value={tiempo}
                onChange={handleOnChangeTiempo}
                min="1"
                max="450"
                required
              />

              <label>Tipo de motor:</label>
              <select onChange={handleOnChangeMotor} name="motor">
                <option value="">--Selecciona una opción--</option>
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diesel</option>
                <option value="electrico">Eléctrico</option>
                <option value="hibrido">Híbrido</option>
              </select>

              <button type="submit">Enviar</button>
            </form>

            {/* Botón para avanzar a la siguiente carta */}
            <button onClick={handleNextCard} style={{ marginTop: '20px' }}>
              Siguiente Carta
            </button>
          </div>
        </div>
        <form
          onSubmit={handleFormOtrosSubmit}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background: '#4e7294',
            padding: '50px',
            gap: '20px',
            marginTop: '100px',
          }}
        >
          <label>Consumo energético:</label>
          <select
            onChange={handleOnChangeConsumoEnergetico}
            name="consumoEnergetico"
            required
          >
            <option value="">--Selecciona una opción--</option>
            <option value="electricidad">Electricidad</option>
            <option value="gas natural">Gas Natural</option>
            <option value="butano">Butano</option>
          </select>

          <label>¿Es renovable?</label>
          <input
            onClick={handleOnChangeEsRenovable}
            value={esRenovable}
            type="checkbox"
            name="esRenovable"
          />
          <label>¿Reciclas?</label>
          <input
            onClick={handleOnChangeRecicla}
            value={recicla}
            type="checkbox"
            name="recicla"
          />
          <button type="submit">Enviar</button>
        </form>
        <form
          onSubmit={handleFormAlimentacionSubmit}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            background: '#4e7294',
            padding: '50px',
            gap: '20px',
            marginTop: '100px',
          }}
        >
          <label>Tipo de alimentación:</label>
          <select
            onChange={handleOnChangeAlimento}
            name="alimentacion"
            multiple
          >
            <option value="pollo">Pollo</option>
            <option value="cerdo">Cerdo</option>
            <option value="ternera">Ternera</option>
            <option value="vegetales">Vegetales</option>
          </select>

          <label>Cantidad(g):</label>
          <input
            onChange={handleOnChangeCantidad}
            value={cantidad}
            type="number"
            name="cantidadCarne"
            min="0"
          />

          <label>¿Es de proximidad?</label>
          <input
            onClick={handleOnChangeEsDeProximidad}
            value={esDeProximidad}
            type="checkbox"
            name="esDeProximidad"
          />

          <button type="submit">Enviar</button>
        </form>
        <CalculoHuella />
      </div>
    </div>
  )
}

export default FormTuHuella
