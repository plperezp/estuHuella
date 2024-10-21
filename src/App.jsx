import '../src/css/App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Foro from './pages/Foro'
import PrivateArea from './pages/PrivateArea'
import SignUp from '../src/pages/auth/SignUp'
import Login from '../src/pages/auth/Login'
import Error from './pages/Error'
import FormTuHuella from './pages/FormTuHuella'
import princesaGalactica from './assets/avatar.assets/princesaGalactica.png'
import recicledBoy from './assets/avatar.assets/recicledBoy.png'
import recicledGollum from './assets/avatar.assets/recicledGollum.png'
import SuperNature from './assets/avatar.assets/SuperNature.png'
import mrBotellita from './assets/avatar.assets/mrBotellita.png'
import niñaRama from './assets/avatar.assets/niñaRama.png'
import neoShrek from './assets/avatar.assets/neoShrek.png'
import emoNature from './assets/avatar.assets/emoNature.png'
import hipstree from './assets/avatar.assets/hipstree.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import services from './services/config'

function App() {
  const navigate = useNavigate()
  const [dataUser, setDataUser] = useState({})
  const [mediaHuella, setMediaHuella] = useState(0)

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
  console.log(avatar)
  useEffect(() => {
    handleGetUser()
  }, [])

  const handleGetUser = async () => {
    console.log('llamando al usuario')
    try {
      const response = await services.get(`/user`)

      setDataUser(response.data)
      console.log('aqui prueba user', dataUser)
      const numHuella = await handleMediaHuella(response.data.huella)
      console.log(numHuella)
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

  handleMediaHuella(dataUser.huella)

  if (dataUser.huella === undefined) {
    return <h3>Loading</h3>
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard avatar={avatar} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/huella" element={<FormTuHuella avatar={avatar} />} />
        <Route
          path="/foro"
          element={<Foro dataUser={dataUser} avatar={avatar} />}
        />
        <Route
          path="/private"
          element={<PrivateArea dataUser={dataUser} avatar={avatar} />}
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
