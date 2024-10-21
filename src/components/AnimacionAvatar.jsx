import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web'
import princesaGalactica from '../assets/avatar.assets/princesaGalactica.png'
import recicledBoy from '../assets/avatar.assets/recicledBoy.png'
import recicledGollum from '../assets/avatar.assets/recicledGollum.png'
import SuperNature from '../assets/avatar.assets/SuperNature.png'
import mrBotellita from '../assets/avatar.assets/mrBotellita.png'
import niñaRama from '../assets/avatar.assets/niñaRama.png'
import neoShrek from '../assets/avatar.assets/neoShrek.png'
import emoNature from '../assets/avatar.assets/emoNature.png'
import hipstree from '../assets/avatar.assets/hipstree.png'
import editar from '../assets/editar.png'

import '../css/animacionAvatar.css'
import { useEffect, useState } from 'react'
import services from '../services/config'

// Aquí solo almacenamos los nombres de los avatares
const avatarData = [
  { name: 'princesaGalactica', imageUrl: princesaGalactica },
  { name: 'recicledBoy', imageUrl: recicledBoy },
  { name: 'recicledGollum', imageUrl: recicledGollum },
  { name: 'SuperNature', imageUrl: SuperNature },
  { name: 'mrBotellita', imageUrl: mrBotellita },
  { name: 'niñaRama', imageUrl: niñaRama },
  { name: 'neoShrek', imageUrl: neoShrek },
  { name: 'emoNature', imageUrl: emoNature },
  { name: 'hipstree', imageUrl: hipstree },
]

export default function AnimacionAvatar(props) {
  const [open, setOpen] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  useEffect(() => {
    props.handleGetUser()
  }, [selectedAvatar])
  const changeImg = async (avatarName) => {
    try {
      await services.patch('/user', { img: avatarName })
      console.log('Avatar actualizado:', avatarName)
    } catch (error) {
      console.log('Error al actualizar el avatar:', error)
    }
  }

  const springApi = useSpringRef()
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '50%' },
    to: {
      size: open ? '100%' : '30%',
    },
  })

  const transApi = useSpringRef()
  const transition = useTransition(open ? avatarData : [], {
    ref: transApi,
    trail: 400 / avatarData.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    keys: (item) => item.name,
  })

  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ])

  // Manejar la selección de un avatar
  const handleClick = (avatarName) => {
    setSelectedAvatar(avatarName)
    setOpen(false) // Cierra el contenedor de avatares
    changeImg(avatarName) // Llamar a changeImg con el nombre del avatar
  }

  return (
    <div className="wrapper">
      {/* Icono de lápiz para abrir la animación */}
      <div
        className="edit-icon"
        onClick={() => setOpen((prev) => !prev)} // Alternar apertura del contenedor
        style={{ cursor: 'pointer', marginBottom: '20px' }}
      >
        <img src={editar} alt="editar" />
      </div>

      <animated.div
        style={{
          ...rest,
          width: size,
          height: size,
          background: open ? '#00000093' : 'transparent',
          backdropFilter: open ? 'blur(10px)' : 'nome',
          display: open ? 'grid' : 'none',
          zIndex: open ? '10' : '0',
        }}
        className={'container-avatar'}
      >
        {transition((style, item) => (
          <animated.div
            className={'item'}
            onClick={(e) => {
              e.stopPropagation()
              handleClick(item.name) // Pasamos solo el nombre
            }}
            style={{
              ...style,
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </animated.div>
    </div>
  )
}
