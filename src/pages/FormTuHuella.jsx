import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import services from '../services/config'
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'
import '../css/formtuhuella.css'
import CalculoHuella from '../components/CalculoHuella'
<<<<<<< HEAD
import AnimacionPorcentaje from '../components/AnimacionPorcentaje'
=======
import Footer from '../components/Footer'
>>>>>>> 8de9655e426334fb9c57f66dde99488f7eff5fc2

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
  const [currentCategory, setCurrentCategory] = useState('transporte')
  const [start, setStart] = useState(false)

  const [dataUser, setDataUser] = useState({})
  const cards = [
    {
      title: `Habito 1`,
      content: `Este es el primer ${currentCategory}.`,
    },
    {
      title: `Habito 2`,
      content: `Este es el segundo ${currentCategory}.`,
    },
    {
      title: `Habito 3`,
      content: `Este es el tercer ${currentCategory}.`,
    },
    {
      title: `Habito 4`,
      content: `Este es el cuarto ${currentCategory}.`,
    },
    {
      title: `Habito 5`,
      content: `Este es el quinto ${currentCategory}.`,
    },
    {
      title: `Habito 6`,
      content: `Este es el sexto ${currentCategory}.`,
    },
    {
      title: `Habito 7`,
      content: `Este es el séptimo ${currentCategory}.`,
    },
    {
      title: `Habito 8`,
      content: `Este es el octavo ${currentCategory}.`,
    },
    {
      title: `Habito 9`,
      content: `Este es el noveno ${currentCategory}.`,
    },
    {
      title: `Habito 10`,
      content: `Esta es la décima carta de ${currentCategory}.`,
    },
  ]

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
    setEsDeProximidad(e.target.checked)
  }
  const handleOnChangeConsumoEnergetico = (e) => {
    setConsumoEnergetico(e.target.value)
  }
  const handleOnChangeRecicla = (e) => {
    setRecicla(e.target.checked)
  }
  const handleOnChangeEsRenovable = (e) => {
    setEsRenovable(e.target.checked)
  }

  const handleFormTransporteSubmit = async (e) => {
    e.preventDefault()

    try {
      const formTransport = {
        transporte: {
          vehiculo,
          tiempo,
          ...(vehiculo === 'coche' && { motor }),
        },
      }
      await services.post(`/huella/transporte`, formTransport)
      console.log('Añadido correctamente')
      setVehiculo('0')
      setTiempo(0)
      setMotor('')
      handleNextCard()
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
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
      setConsumoEnergetico('')
      setEsRenovable(false)
      setRecicla(false)
      handleNextCard()
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
      handleNextCard
      handleNextCard()
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
  const resetFormState = () => {
    setVehiculo('')
    setTiempo(0)
    setMotor('')
    setAlimento('')
    setCantidad(0)
    setEsDeProximidad(false)
    setConsumoEnergetico('')
    setEsRenovable(false)
    setRecicla(false)
    setErrorMesage('') // Opcional: Resetear mensajes de error
  }
  /* const submitGeneral = (categoria) => {
    try {
      if (categoria === 'transporte' && currentCategory === 'transporte') {
        handleFormTransporteSubmit()
      } else if (categoria === 'consumo' && currentCategory === 'consumo') {
        handleFormOtrosSubmit()
      } else if (
        categoria === 'alimentacion' &&
        currentCategory === 'alimentacion'
      ) {
        handleFormAlimentacionSubmit()
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
    }
  }*/

  // Función para manejar el cambio de carta
  const handleNextCard = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        if (nextIndex < cards.length) {
          return nextIndex
        } else {
          alert(`Has completado todas las cartas! `) // Aquí puedes manejar el final del flujo
          return prevIndex // Mantener el índice si ya se completaron todas las cartas
        }
      })
      resetFormState() // Resetear el estado del formulario al cambiar de tarjeta
      setIsAnimating(false) // Desactivar la animación
    }, 400) // Este tiempo debe coincidir con la duración de la animación
  }

  const handleNextCategory = () => {
    if (currentCategory === 'transporte') {
      setCurrentCategory('consumo')
    } else if (currentCategory === 'consumo') {
      setCurrentCategory('alimentacion')
    } else if (currentCategory === 'alimentacion') {
      setCurrentCategory('')
    }
  }
  useEffect(() => {
    handleGetUser()
  }, [start])

  const handleGetUser = async () => {
    try {
      const response = await services.get(`/user`)

      setDataUser(response.data)

      console.log(response.data)
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  return (
    <>
      <div className="formtuhuella-container">
        <div className="overlay-form">
          <NavBar color={'#73abdf'} />
          {currentCategory === 'transporte' && (
            <div
              className={`card-container ${currentCategory ? 'active' : ''}`}
            >
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
                <select
                  onChange={handleOnChangeMotor}
                  name="motor"
                  disabled={vehiculo !== 'coche'}
                  required={vehiculo === 'coche'}
                >
                  <option value="">--Selecciona una opción--</option>
                  <option value="gasolina">Gasolina</option>
                  <option value="diesel">Diesel</option>
                  <option value="electrico">Eléctrico</option>
                  <option value="hibrido">Híbrido</option>
                </select>

                <button type="submit" style={{ marginTop: '20px' }}>
                  Registrar nuevo {currentCategory}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleNextCategory('consumo')
                  }}
                >
                  Continuar
                </button>
              </form>
            </div>
          </div>
        )}
        {currentCategory === 'consumo' && (
          <div className={`card-container ${currentCategory ? 'active' : ''}`}>
            <div className={`card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              <h2>{cards[currentCardIndex].title}</h2>
              <p>{cards[currentCardIndex].content}</p>
              <form
                onSubmit={handleFormOtrosSubmit}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  background: '#4e7294',
                  padding: '20px',
                  gap: '20px',
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
                  onChange={handleOnChangeEsRenovable}
                  checked={esRenovable}
                  type="checkbox"
                  name="esRenovable"
                />
                <label>¿Reciclas?</label>
                <input
                  onChange={handleOnChangeRecicla}
                  checked={recicla}
                  type="checkbox"
                  name="recicla"
                />

                <button type="submit" style={{ marginTop: '20px' }}>
                  Registar nuevo {currentCategory}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleNextCategory('alimentacion')
                  }}
                >
                  Continuar
                </button>
              </form>
            </div>
          </div>
        )}
        {currentCategory === 'alimentacion' && (
          <div className={`card-container ${currentCategory ? 'active' : ''}`}>
            <div className={`card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              <h2>{cards[currentCardIndex].title}</h2>
              <p>{cards[currentCardIndex].content}</p>
              <form
                onSubmit={handleFormAlimentacionSubmit}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  background: '#4e7294',
                  padding: '20px',
                  gap: '20px',
                }}
              >
                <label>Tipo de alimentación:</label>
                <select
                  required
                  onChange={handleOnChangeAlimento}
                  name="alimentacion"
                  multiple
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

                  <button
                    type="button"
                    onClick={() => {
                      handleNextCategory('otros')
                    }}
                  >
                    siguiente categoria
                  </button>
                </form>

                <button onClick={handleNextCard} style={{ marginTop: '20px' }}>
                  Siguiente Carta
                </button>
              </div>
            </div>
          )}
          {currentCategory === 'otros' && (
            <div
              className={`card-container ${currentCategory ? 'active' : ''}`}
            >
              <div className={`card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <h2>{cards[currentCardIndex].title}</h2>
                <p>{cards[currentCardIndex].content}</p>
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
                  <button
                    type="button"
                    onClick={() => {
                      handleNextCategory('alimentacion')
                    }}
                  >
                    siguiente categoria
                  </button>

                  <button type="submit">Enviar</button>
                </form>
                <button onClick={handleNextCard} style={{ marginTop: '20px' }}>
                  Siguiente Carta
                </button>
              </div>
            </div>
          )}
          {currentCategory === 'alimentacion' && (
            <div
              className={`card-container ${currentCategory ? 'active' : ''}`}
            >
              <div className={`card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <h2>{cards[currentCardIndex].title}</h2>
                <p>{cards[currentCardIndex].content}</p>
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

<<<<<<< HEAD
                <label>¿Es de proximidad?</label>
                <input
                  onChange={handleOnChangeEsDeProximidad}
                  checked={esDeProximidad}
                  type="checkbox"
                  name="esDeProximidad"
                />
                <button type="submit" style={{ marginTop: '20px' }}>
                  Registar nuevo {currentCategory}
                </button>
              </form>
              <CalculoHuella
                setStart={setStart}
                handleNextCategory={handleNextCategory}
              />
            </div>
          </div>
        )}
        <AnimacionPorcentaje dataUser={dataUser} comenzar={start} />
=======
                  <label>¿Es de proximidad?</label>
                  <input
                    onClick={handleOnChangeEsDeProximidad}
                    value={esDeProximidad}
                    type="checkbox"
                    name="esDeProximidad"
                  />

                  <button type="submit">Enviar</button>
                </form>
                <button onClick={handleNextCard} style={{ marginTop: '20px' }}>
                  Siguiente Carta
                </button>
              </div>
            </div>
          )}
          <CalculoHuella />
        </div>
>>>>>>> 8de9655e426334fb9c57f66dde99488f7eff5fc2
      </div>
      <Footer fondo={'src/assets/ocean.jpg'} />
    </>
  )
}

export default FormTuHuella
