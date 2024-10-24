import React, { useState, useEffect, useContext } from 'react'
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/auth.context'
import services from '../services/config'
import { useNavigate } from 'react-router-dom'
import ModalForo from '../components/ModalForo'
import '../css/foro.css'
import SearchBar from '../components/SearchBar'
import imgAvatar from '../../utils/avatar'
import Footer from '../components/Footer'
import axios from 'axios'

const Foro = () => {
  const navigate = useNavigate()
  const { loggedUserId, isLoggedIn } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [esEditar, setEsEditar] = useState(false)
  const [idEditar, setIdEditar] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [userData, setUserData] = useState({})
  const [publicData, setPublicData] = useState({})

  useEffect(() => {
    getDataAll()
    getUserData()
  }, [])

  const getUserData = async () => {
    try {
      const response = await services.get('/user')

      const avatar = imgAvatar(response.data.img)
      setUserData({ ...response.data, avatar: avatar })
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message)
        navigate('/error')
      }
    }
  }

  const getDataAll = async () => {
    try {
      const response = await services.get('/foro')
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      const dataconAvatar = sortedData.map((cadaData) => {
        const avatar = imgAvatar(cadaData.user.img)
        return { ...cadaData, avatar: avatar }
      })
      setData(dataconAvatar)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message)
        navigate('/error')
      }
    }
  }

  const handleSubmitCrear = async (e) => {
    e.preventDefault()

    try {
      const formPostCreate = {
        title,
        text,
      }

      const responsePost = await services.post('/foro', formPostCreate)
      setData([...data, responsePost.data])
      console.log('Post creado correctamente')
      getDataAll()
    } catch (error) {
      console.log(error)

      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }
  const userfilter = data.map((cadauser) => cadauser.user)
  const handleSubmitEditar = async (e) => {
    e.preventDefault()
    try {
      const formPostEditar = {
        title,
        text,
        user: loggedUserId,
      }
      await services.put(`/foro/${idEditar}`, formPostEditar)
      console.log(idEditar)
      getDataAll()
      setEsEditar(false)
      setTitle('')
      setText('')
    } catch (error) {
      handleError(error)
    }
  }

  const handleSubmitEliminar = async (e, postId) => {
    e.preventDefault()
    try {
      await services.delete(`/foro/${postId}`)
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
  const filteredPosts = data.filter((post) =>
    post.title.toLowerCase().startsWith(searchValue.toLowerCase())
  )

  if (data.length <= 0 || filteredPosts.length <= 0) {
    return (
      <div className="noPost">
        <h2>Actualmente no hay post en el foro, ¡Se el primero en hacerlo!</h2>
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
          isLoggedIn={isLoggedIn}
        />
      </div>
    )
  }

  const [mainPost, ...otherPosts] = filteredPosts

  return (
    <>
      <div className="fondo-foro">
        <div className="overlay">
          <NavBar color={'#7ed282'} />
          <div style={{ margin: '0 auto' }}>
            <div className="topForo">
              <SearchBar
                getDataAll={getDataAll}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />

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
            </div>
            <div className="container-post">
              {mainPost && (
                <div className="main-post">
                  <div className="boxname">
                    <h5>{mainPost.user.username}</h5>
                    <img
                      src={mainPost.avatar}
                      alt="avatar"
                      className="user-image"
                    />
                  </div>

                  <h2>{mainPost.title}</h2>
                  <p>{mainPost.text}</p>
                  {loggedUserId === mainPost.user._id && (
                    <div className="post-actions">
                      <button
                        onClick={(e) => handleSubmitEliminar(e, mainPost._id)}
                        type="button"
                        className="delete-button"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={(e) => handleEditar(e, mainPost)}
                        type="button"
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="posts-grid">
                {otherPosts.map((post) => (
                  <div key={post._id} className="post">
                    <div className="boxname">
                      <h5>{post.user.username}</h5>
                      <img
                        src={post.avatar}
                        alt="avatar"
                        className="user-image"
                      />
                    </div>

                    <h2>{post.title}</h2>
                    <p>{post.text}</p>
                    {loggedUserId === otherPosts.user._id && (
                      <div className="post-actions">
                        <button
                          onClick={(e) => handleSubmitEliminar(e, post._id)}
                          type="button"
                          className="delete-button"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={(e) => handleEditar(e, post)}
                          type="button"
                        >
                          Editar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer fondo={'src/assets/recycling.jpg'} />
    </>
  )
}

export default Foro
