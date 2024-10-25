import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { AuthContext } from '../context/auth.context' // Asegúrate de importar el contexto de autenticación

const ITEM_HEIGHT = 48

export default function LongMenu() {
  const { isLoggedIn, authenticateUser } = React.useContext(AuthContext) // Asegúrate de obtener authenticateUser
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [loading, setLoading] = React.useState(false)

  const options = [
    { label: 'Home', path: '/' },
    { label: 'Sign up', path: '/signup', requireAuth: false },
    { label: 'Login', path: '/login', requireAuth: false },
    { label: 'Foro', path: '/foro' },
    { label: 'Crea tu huella', path: '/huella', requireAuth: true },
    { label: 'Area privada', path: '/private', requireAuth: true },
    { label: 'Log out', action: 'logout', requireAuth: true },
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOptionSelect = async (option) => {
    setLoading(true)
    try {
      if (option.action === 'logout') {
        // Si la opción es Log out, realiza el proceso de cierre de sesión
        localStorage.removeItem('authToken')
        await authenticateUser()
        navigate('/')
      } else {
        navigate(option.path)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: 'white' }}
      >
        <MoreVertIcon style={{ fontSize: '36px' }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options
          .filter((option) => (option.requireAuth ? isLoggedIn : true))
          .map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </MenuItem>
          ))}
      </Menu>
    </div>
  )
}
