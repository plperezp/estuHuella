import React from 'react'
import NavBar from '../../components/NavBar'
import { useState } from 'react'
import services from '../../services/config'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMesage] = useState('')

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleNameChange = (e) => setName(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      const newUser = {
        email,
        username,
        name,
        password,
      }
      await services.post('/auth/signup', newUser)

      navigate('/login')
    } catch (error) {
      console.log(error)

      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  const handleGetGoogle = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get('api/auth/google')

      if (response.status === 200) {
        window.location.href = response.data.redirectUrl
      } else {
        setErrorMesage(response.data.message)
      }
    } catch (error) {
      console.error(error)
      setErrorMesage('Error durante la autenticación')
    }
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
      <NavBar />

      <div className="auth-container">
        <button
          className="google-login-button "
          onClick={(e) => handleGetGoogle(e)}
        >
          Iniciar sesión con Google
        </button>
        <form
          onSubmit={handleSignup}
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
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            ></input>
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            ></input>
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            ></input>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
