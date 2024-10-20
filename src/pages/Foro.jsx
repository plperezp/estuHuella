import React, { useState, useEffect, useContext } from 'react'
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/auth.context'
import services from '../services/config'
import { useNavigate } from 'react-router-dom'
import ModalForo from '../components/ModalForo'
import '../css/foro.css'

const Foro = () => {
  const navigate = useNavigate()
  const { loggedUserId } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [esEditar, setEsEditar] = useState(false)
  const [idEditar, setIdEditar] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getDataAll()
  }, [])

  const getDataAll = async () => {
    try {
      const response = await services.get('/foro')
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setData(sortedData)
    } catch (error) {
      handleError(error)
    }
  }

  const handleSubmitCrear = async () => {
    try {
      const formPostCreate = { title, text }
      await services.post('/foro', formPostCreate)
      getDataAll()
    } catch (error) {
      handleError(error)
    }
  }

  const handleSubmitEditar = async () => {
    try {
      const formPostEditar = { title, text, user: loggedUserId }
      await services.put(`/foro/${idEditar}`, formPostEditar)
      getDataAll()
      setTitle('')
      setText('')
    } catch (error) {
      handleError(error)
    }
  }

  const handleError = (error) => {
    if (error.response && error.response.status === 400) {
      setErrorMessage(error.response.data.message)
    } else {
      navigate('/error')
    }
  }

  const handleEditar = (e, post) => {
    e.preventDefault()
    setTitle(post.title)
    setText(post.text)
    setIsOpen(true)
    setIdEditar(post._id)
    setEsEditar(true)
  }

  const handleSubmitEliminar = async (e, postId) => {
    e.preventDefault()
    try {
      await services.delete(`/foro/${postId}`)
      getDataAll()
    } catch (error) {
      handleError(error)
    }
  }

  if (data.length <= 0) {
    return <h2>...No hay posts</h2>
  }

  const [mainPost, ...otherPosts] = data
  console.log(mainPost.user)
  return (
    <div className="fondo-foro">
      <NavBar />
      <div className="container-post">
        <ModalForo
          esEditar={esEditar}
          handleSubmitEditar={handleSubmitEditar}
          handleSubmitCrear={handleSubmitCrear}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          title={title}
          text={text}
          setTitle={setTitle}
          setText={setText}
          setEsEditar={setEsEditar}
        />

        {mainPost && (
          <div className="main-post">
            <div className="boxname">
              <h5>{mainPost.user.username}</h5>
              <img
                src={mainPost.user.profilePicture}
                alt="avatar"
                className="user-image"
              />
            </div>
            <h2>{mainPost.title}</h2>
            <p>{mainPost.text}</p>
            <div className="post-actions">
              <button
                onClick={(e) => handleSubmitEliminar(e, mainPost._id)}
                type="button"
                className="delete-button"
              >
                Eliminar
              </button>
              <button onClick={(e) => handleEditar(e, mainPost)} type="button">
                Editar
              </button>
            </div>
          </div>
        )}

        <div className="posts-grid">
          {otherPosts.map((post) => (
            <div key={post._id} className="post">
              <div className="boxname">
                <h5>{post.user.username}</h5>
                <img
                  src={post.user.profilePicture}
                  alt="avatar"
                  className="user-image"
                />
              </div>

              <h2>{post.title}</h2>
              <p>{post.text}</p>
              <div className="post-actions">
                <button
                  onClick={(e) => handleSubmitEliminar(e, post._id)}
                  type="button"
                  className="delete-button"
                >
                  Eliminar
                </button>
                <button onClick={(e) => handleEditar(e, post)} type="button">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Foro
