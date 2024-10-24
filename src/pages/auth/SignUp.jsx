import React, { useState, useContext } from 'react'
import NavBar from '../../components/NavBar'
import services from '../../services/config'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import '../../css/login.css'
import axios from 'axios'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMesage] = useState('')
  const { authenticateUser } = useContext(AuthContext)

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
      const response = await axios.get('/api/auth/google')

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
    <div className="home-container">
      <div className="overlay">
        <NavBar color={'#d1e2cd'} />

        <div className="box-login">
          <div className="form-login">
            <form className="register-form-login" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleNameChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button type="submit">Registrarte</button>

              <p className="message">
                ¿Estás registrado? <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
