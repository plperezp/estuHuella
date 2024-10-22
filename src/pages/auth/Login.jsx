import React, { useState, useContext } from 'react'
import NavBar from '../../components/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import services from '../../services/config'
import '../../css/login.css'

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
    <div className="home-container">
      <div className="overlay">
        <NavBar />
        <div className=" box-login">
          <div className="form-login">
            <form className="register-form-login" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
              />
              <button>login</button>
              <p class="message">
                No esta registrado? <Link to={'/signup'}>Registrar</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
