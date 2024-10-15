import React from 'react'
import NavBar from '../components/NavBar'
import '../css/dashboard.css'
import AnimationLogo from '../components/AnimationLogo'

function Dashboard() {
  return (
    <div className="home-container">
      <NavBar />
      <div style={{ height: '90%' }}>
        <AnimationLogo />
      </div>
    </div>
  )
}

export default Dashboard
