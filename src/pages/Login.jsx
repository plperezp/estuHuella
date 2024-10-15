import React from 'react'
import NavBar from '../components/NavBar'

function Login() {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center' , width:'100%', height:'100%', flexDirection:'column'}}>
    <NavBar/>
   
      <form style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', background:'#aae6aa', padding:'50px', gap:'20px', marginTop:'100px'}}>
        
      <div>
      <label>Email:</label>
      <input type='email'></input>
      </div>
      <div>
      <label>Password:</label>
      <input type='password'></input>
      </div>
      </form>
  </div>
  )
}

export default Login