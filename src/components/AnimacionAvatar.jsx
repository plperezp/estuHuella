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
import { useState } from 'react'

const avatarData = [
  { imageUrl: princesaGalactica },
  { imageUrl: recicledBoy },
  { imageUrl: recicledGollum },
  { imageUrl: SuperNature },
  { imageUrl: mrBotellita },
  { imageUrl: niñaRama },
  { imageUrl: neoShrek },
  { imageUrl: emoNature },
  { imageUrl: hipstree },
]

export default function App() {
  const [open, setOpen] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(null)

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
    keys: (item) => item.imageUrl,
  })

  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ])

  const handleClick = (imageUrl) => {
    setSelectedAvatar(imageUrl)
    setOpen(false) // Cierra el contenedor de avatares
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

      <div className="selected-avatar-container">
        {selectedAvatar && (
          <div
            className="selected-avatar"
            style={{ backgroundImage: `url(${selectedAvatar})` }}
          ></div>
        )}
      </div>
      <animated.div
        style={{
          ...rest,
          width: size,
          height: size,
          background: open ? '#0a0a0a1f' : 'transparent',
        }}
        className={'container'}
      >
        {transition((style, item) => (
          <animated.div
            className={'item'}
            onClick={(e) => {
              e.stopPropagation()
              handleClick(item.imageUrl)
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
