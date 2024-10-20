import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BtnNav from './BtnNav'
import { AuthContext } from '../context/auth.context'
import services from '../services/config'
import { useParams } from 'react-router-dom'

function NavBar() {
  const params = useParams()
  const navigate = useNavigate()
  const { isLoggedIn, authenticateUser, loggedUserId } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken')
      await authenticateUser()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="navBar">
      <Link to={'/'}>
        <BtnNav color={'#d1e2cd'} value={'Home'} />
      </Link>
      {!isLoggedIn && (
        <Link to={'/signup'}>
          <BtnNav color={'#d1e2cd'} value={'Sign up'} />
        </Link>
      )}
      {!isLoggedIn && (
        <Link to={'/login'}>
          <BtnNav color={'#93b628'} value={'Login'} />
        </Link>
      )}
      <Link to={'/foro'}>
        <BtnNav color={'#93b628'} value={'Foro'} />
      </Link>
      {isLoggedIn && (
        <Link to={`/huella`}>
          <BtnNav color={'#2e5301'} value={'Crea tu huella'} />
        </Link>
      )}

      {isLoggedIn && (
        <Link to={'/private'}>
          <BtnNav color={'#2e5301'} value={'Area privada'} />
        </Link>
      )}

      {isLoggedIn && (
        <Link to={'/'} onClick={handleLogout}>
          <BtnNav color={'#2e5301'} value={'Log out'} />
        </Link>
      )}
    </div>
  )
}

export default NavBar
