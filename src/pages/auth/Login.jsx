import React, { useState, useContext } from 'react'
import NavBar from '../../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import services from '../../services/config'

function Login() {
  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMesage] = useState('')

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const userCredentials = {
        email,
        password,
      }

      const response = await services.post('/auth/login', userCredentials)
      console.log(response)

      localStorage.setItem('authToken', response.data.authToken)
      await authenticateUser()

      navigate('/')
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        navigate('/error')
      }
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

      <form
        onSubmit={handleLogin}
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
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default Login
