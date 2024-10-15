import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "../src/css/App.css"
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import Login from './pages/Login'


function App() {

  return (
    <>
     <Routes>

      <Route path='/' element={<Dashboard/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>


     </Routes>
    </>
  )
}



export default App
