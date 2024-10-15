import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
   <div style={{display:'flex', justifyContent:'space-between',alignItems:'flex-start',background:'#aae6aa', height:'10%', width:'100%', padding:'20px'}}> 

    <Link to={"/"}>
    <h3>Home</h3>
    </Link>
    <Link to={"/signup"}>
    <h3>Sign up</h3>
    </Link>
    <Link to={"/login"}>
    <h3>Login</h3>
    </Link>
    <Link to={"/"}>
    <h3>Log out</h3>
    </Link>
    

</div>

  )
}

export default NavBar