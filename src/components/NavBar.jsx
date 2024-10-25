import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BtnNav from './BtnNav'
import { AuthContext } from '../context/auth.context'
import services from '../services/config'
import imgAvatar from '../../utils/avatar'
import LongMenu from '../components/Menu-movil.jsx'
function NavBar(porps) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const { color, avatar } = porps
  const { isLoggedIn, authenticateUser, loggedUserId } = useContext(AuthContext)
  useEffect(() => {
    getUserData()
  }, [])
  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken')
      await authenticateUser()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const getUserData = async () => {
    try {
      const response = await services.get('/user')
      const avatar = imgAvatar(response.data.img)
      setUserData({ ...response.data, avatar: avatar })
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message)
        navigate('/error')
      }
    }
  }
  const handleOptionSelect = (option) => {
    if (option === 'Home') {
      navigate('/')
    } else if (option === 'Sign up') {
      navigate('/signup')
    } else if (option === 'Login') {
      navigate('/login')
    } else if (option === 'Foro') {
      navigate('/foro')
    } else if (option === 'Crea tu huella') {
      navigate('/huella')
    } else if (option === 'Area privada') {
      navigate('/private')
    } else if (option === 'Log out') {
      handleLogout()
    }
  }

  return (
    <div className="navBar">
      <Link className={'home-boton'} to={'/'}>
        <p> ES TU</p>
        <p>HUELLA</p>
      </Link>
      <div className="menu">
        {!isLoggedIn && (
          <Link to={'/signup'}>
            <BtnNav color={color} value={'Sign up'} />
          </Link>
        )}
        {!isLoggedIn && (
          <Link to={'/login'}>
            <BtnNav color={color} value={'Login'} />
          </Link>
        )}
        <Link to={'/foro'}>
          <BtnNav color={color} value={'Foro'} />
        </Link>
        {isLoggedIn && (
          <Link to={`/huella`}>
            <BtnNav color={color} value={'Crea tu huella'} />
          </Link>
        )}

        {isLoggedIn && (
          <Link to={'/private'}>
            <BtnNav color={color} value={'Area privada'} />
          </Link>
        )}

        {isLoggedIn && (
          <Link to={'/'} onClick={handleLogout}>
            <BtnNav color={color} value={'Log out'} />
          </Link>
        )}
        {isLoggedIn && (
          <img
            className="avatar-nav"
            src={avatar || userData.avatar}
            alt="avatar"
          />
        )}
      </div>
      <div className="nav-menu mobile-only">
        <LongMenu handleOptionSelect={handleOptionSelect} />
      </div>
    </div>
  )
}

export default NavBar
