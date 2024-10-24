import React, { useState, useEffect } from 'react'
import '../css/animacionPorcentaje.css'
import { useNavigate } from 'react-router-dom'

const AnimacionPorcentaje = ({
  comenzar,
  setIsVisiblemensaje,
  isVisiblemensaje,
}) => {
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (comenzar) {
      setProgress(0)
      setIsAnimating(true)
      setIsVisible(true)
    }
  }, [comenzar])

  useEffect(() => {
    let interval
    if (isAnimating && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100))
      }, 50)
    } else if (progress === 100) {
      setIsAnimating(false)
      setTimeout(() => {
        navigate('/huella')
        setIsVisible(true)
        setIsVisiblemensaje(true)
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isAnimating, progress])

  return (
    <div
      className="porcentaje"
      style={{
        display: isVisiblemensaje ? 'none' : 'flex',
      }}
    >
      {isVisible && (
        <div className="pie">
          <div
            className="circle"
            style={{
              background: `conic-gradient(#73abdf ${progress}%, #2f3e46 ${progress}% 100%)`,
            }}
          ></div>
          <div className="percent">
            <div className="number">{progress}%</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnimacionPorcentaje
