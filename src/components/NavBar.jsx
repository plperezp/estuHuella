import React from 'react'
import { Link } from 'react-router-dom'
import BtnNav from './BtnNav'

function NavBar() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        background: 'transparent',
        height: '10%',
        width: '100%',
        padding: '1px',
      }}
    >
      <Link to={'/'}>
        <BtnNav color={'#d1e2cd'} value={'Home'} />
      </Link>
      <Link to={'/signup'}>
        <BtnNav color={'#d1e2cd'} value={'Sign up'} />
      </Link>
      <Link to={'/login'}>
        <BtnNav color={'#93b628'} value={'Login'} />
      </Link>
      <Link to={'/'}>
        <BtnNav color={'#2e5301'} value={'Log out'} />
      </Link>
    </div>
  )
}

export default NavBar
