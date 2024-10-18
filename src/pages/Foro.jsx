import React from 'react'
import NavBar from '../components/NavBar'
import { AuthContext } from '../context/auth.context'
import { useState, useEffect, useContext } from 'react'
import services from '../services/config'
import { useNavigate, useParams } from 'react-router-dom'

function Foro() {
  const params = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const { loggedUserId } = useContext(AuthContext)
  const [errorMessage, setErrorMesage] = useState('')
  const [data, setdata] = useState([])
  const [dataPost, setdataPost] = useState({})
  const [esEditar, setEsEditar] = useState(false)
  const [idEditar, setIdEditar] = useState('')

  const handleTitleOnChange = (e) => {
    setTitle(e.target.value)
  }
  const handleTextOnChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    getDataAll()
  }, [])
 

  const handleSubmitCrear = async (e) => {
    e.preventDefault()
    try {
      const formPostCreate = {
        title,
        text,
        user: loggedUserId,
      }

      const responsePost = await services.post('/foro', formPostCreate)
      setdataPost(responsePost.data)

      console.log('Post creado correctamente')
      console.log(getDataAll)
      getDataAll()
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }
  const handleSubmitEditar = async (e) => {
    e.preventDefault()
    setEsEditar(!esEditar)
    setTitle('')
    setText('')
    console.log('ediar')
    try {
      const formPostEditar = {
        title,
        text,
        user: loggedUserId,
      }

      const response = await services.put(`/foro/${idEditar}`, formPostEditar)

      console.log('Post editado correctamente', response.data)
      getDataAll()
    } catch (error) {
      console.log(error)

      if (error.response && error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  const handleSubmitEliminar = async (e, postId) => {
    e.preventDefault()

    try {
      await services.delete(`/foro/${postId}`)
      getDataAll()
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }
  const getDataAll = async () => {
    try {
      const response = await services.get(`/foro`)
      console.log(response)
      setdata(response.data)
      console.log(data)
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

 
  const handleEditar = (e, post) => {
    e.preventDefault()
    setTitle(post.title)
    setText(post.text)
    setEsEditar(true)
    setIdEditar(post._id)
  }

  if (data.length <= 0) {
    return <h2> ...No hay posts</h2>
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <NavBar></NavBar>

      <form
        onSubmit={esEditar ? handleSubmitEditar : handleSubmitCrear}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#aae6aa',
          padding: '50px',
          gap: '20px',
          marginTop: '100px',
        }}
      >
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleOnChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            value={text}
            onChange={handleTextOnChange}
            required
            style={{
              width: '100%',
              height: '80px',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {esEditar ? 'Guardar' : 'Crear'}
          </button>
        </div>
      </form>
      {data.map((post) => {
        return (
          <div
            key={post._id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '30px',
              border: '1px solid, black',
            }}
          >
            <h5>{post.user.username}</h5>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <div style={{ display: 'flex' }}>
              <button
                onClick={(e) => handleSubmitEliminar(e, post._id)}
                type="button"
                style={{
                  backgroundColor: '#ff4d4d',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Eliminar
              </button>
              <button
                onClick={(e) => {
                  handleEditar(e, post)
                }}
                type="button"
                style={{
                  backgroundColor: '#4d79ff',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Editar
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Foro
