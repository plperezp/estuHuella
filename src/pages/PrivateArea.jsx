import princesaGalactica from '../assets/avatar.assets/princesaGalactica.png'
import recicledBoy from '../assets/avatar.assets/recicledBoy.png'
import recicledGollum from '../assets/avatar.assets/recicledGollum.png'
import SuperNature from '../assets/avatar.assets/SuperNature.png'
import mrBotellita from '../assets/avatar.assets/mrBotellita.png'
import niñaRama from '../assets/avatar.assets/niñaRama.png'
import neoShrek from '../assets/avatar.assets/neoShrek.png'
import emoNature from '../assets/avatar.assets/emoNature.png'
import hipstree from '../assets/avatar.assets/hipstree.png'
import '../css/areaPrivada.css'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import services from '../services/config'
import { AgGauge } from 'ag-charts-react'
import 'ag-charts-enterprise'
import AnimacionAvatar from '../components/AnimacionAvatar'
import Footer from '../components/Footer'
import { ClockLoader } from 'react-spinners'
import factoryImage from '../assets/factory.jpg'
import bosqueImage from '../assets/fondoBosque.jpg'

function PrivateArea() {
  const navigate = useNavigate()
  const [dataUser, setDataUser] = useState({})
  const [mediaHuella, setMediaHuella] = useState(0)

  const imageMediahuella = (mediaHuella) => {
    return mediaHuella >= 30 ? factoryImage : bosqueImage
  }

  const imageFondo = imageMediahuella(mediaHuella)

  const [options, setOptions] = useState({
    type: 'radial-gauge',
    value: { mediaHuella },
    scale: {
      min: 0,
      max: 50,
      label: {
        enabled: true,
        fontSize: 10,
      },
      ticks: {
        enabled: true,
        size: 5,
        color: '#999',
      },
    },
    bar: {
      fills: Array.from({ length: 50 }, (_, index) => {
        const green = Math.round(224 - (index * (224 - 80)) / 49)
        const gray = 66
        return { color: `rgb(${green}, ${green}, ${gray})` }
      }),
      fillMode: 'discrete',
    },
    label: {
      formatter({ value }) {
        return `${value.toFixed(0)} kg CO₂`
      },
    },
    outerRadius: 200,
    innerRadius: 150,
  })

  useEffect(() => {
    handleGetUser()
  }, [])

  const handleGetUser = async () => {
    try {
      const response = await services.get(`/user`)

      setDataUser(response.data)
      const numHuella = await handleMediaHuella(response.data.huella)

      setMediaHuella(parseFloat(numHuella.toFixed(2)))
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  const handleMediaHuella = (array) => {
    if (!array || array.length === 0) return 0
    const sumar = array.reduce((acu, valor) => acu + valor, 0)
    return sumar / array.length
  }

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      value: mediaHuella,
    }))
  }, [mediaHuella])

  if (dataUser.huella === undefined) {
    return (
      <div className="clockLoader">
        <ClockLoader />
      </div>
    )
  }

  const imgAvatar = (img) => {
    if (img === 'mrBotellita') {
      return mrBotellita
    } else if (img === 'emoNature') {
      return emoNature
    } else if (img === 'hipstree') {
      return hipstree
    } else if (img === 'neoShrek') {
      return neoShrek
    } else if (img === 'niñaRama') {
      return niñaRama
    } else if (img === 'princesaGalactica') {
      return princesaGalactica
    } else if (img === 'recicledBoy') {
      return recicledBoy
    } else if (img === 'recicledGollum') {
      return recicledGollum
    } else if (img === 'SuperNature') {
      return SuperNature
    }
  }

  const avatar = imgAvatar(dataUser.img)

  const mensajeHuella = (mediaHuella) => {
    if (mediaHuella <= 16) {
      return (
        <p>
          "Cada pequeño paso que das hacia un futuro más verde es un gran salto
          para el planeta."
        </p>
      )
    } else if (mediaHuella > 16 && mediaHuella <= 25) {
      return (
        <p>
          "Vas por buen camino, ¡puedes hacer una gran diferencia para el
          planeta!"
        </p>
      )
    } else if (mediaHuella > 25 && mediaHuella < 50) {
      return (
        <p> Es momento de actuar: cada cambio cuenta para reducir tu impacto</p>
      )
    } else if (mediaHuella >= 50) {
      return <p>Eres una Chernobyl con piernas, ¡Es hora del cambio!</p>
    }
  }
  const frase = mensajeHuella(mediaHuella)

  return (
    <>
      <div
        className="conatainer-areaprivada"
        style={{ backgroundImage: `url(${imageFondo})` }}
      >
        <div className="overlay">
          <NavBar color={'#d7d742'} avatar={avatar} />
          <AnimacionAvatar handleGetUser={handleGetUser} />
          <div className="info-user">
            <div className="tu-huella">
              <h1 style={{ color: 'white', fontSize: '50px' }}>
                Es tu Huella de hoy: {dataUser.huella[0]}kg CO₂
              </h1>
              <div className="graficaMediHuella">
                <h2 style={{ color: 'white', fontSize: '35px' }}>
                  El progreso de tu Huella
                </h2>
                <AgGauge
                  options={options}
                  style={{ width: '500px', height: '300px' }}
                />
              </div>
              <p className="frase">{frase}</p>
            </div>
            <div className="avatar">
              <img style={{ width: '250px' }} src={avatar} alt="avatar" />
            </div>
          </div>

          <div className="info-avatar">
            <h3>
              Name: <span>{dataUser.name}</span>
            </h3>
            <h4>
              Username: <span>{dataUser.username}</span>
            </h4>
            <h4>
              Email: <span>{dataUser.email}</span>
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivateArea
