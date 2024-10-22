import React from 'react'
import { useInView } from 'react-intersection-observer'
// Asegúrate de crear este archivo para el estilo

const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Cambia este valor para ajustar cuándo se activa la animación
  })

  return (
    <div
      ref={ref}
      className={`fade-in-section-scroll ${inView ? 'fade-in-scroll' : ''}`}
    >
      {children}
    </div>
  )
}

export default FadeInSection
