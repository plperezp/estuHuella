import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'
import '../css/animationLogo.css'

function AnimationLogo() {
  const ref = useRef([])
  const [items, setItems] = useState([])

  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: 'd1e2cd',
    },
    enter: [
      { opacity: 1, height: 100, innerHeight: 100 },
      { transform: 'perspective(600px) rotateX(180deg)', color: 'd1e2cd' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: 'd1e2cd' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: 'd1e2cd' },
  })

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout)
    ref.current = []
    setItems([])
    ref.current.push(setTimeout(() => setItems(['ES TU...', 'MUNDO']), 1000))
    ref.current.push(setTimeout(() => setItems(['ES TU...', 'MOMENTO']), 3000))
    ref.current.push(setTimeout(() => setItems(['ES TU', 'HUELLA']), 5000))
  }, [])

  useEffect(() => {
    reset()
    return () => ref.current.forEach(clearTimeout)
  }, [reset])

  return (
    <div className={'container'}>
      <div className={'main'}>
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div
            className={'transitionsItem'}
            style={rest}
            onClick={reset}
          >
            <animated.div style={{ overflow: 'hidden', height: innerHeight }}>
              {item}
            </animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default AnimationLogo
