import React from 'react'
import './Navbar.css'
import navlogo from '../Assets/nav-logo.svg'
import navprofileIcon from '../Assets/nav-profile.svg'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src="./images/logo.jpg" className='nav-logo' alt="" />
      <p>|||SecondLifestyle</p>
      <Link to={"/login"}>
      <img  title='login !' src={"https://static.vecteezy.com/system/resources/previews/022/014/159/original/avatar-icon-profile-icon-member-login-isolated-vector.jpg"} className='nav-profile' alt="" />
      
      </Link>
    </div>
  )
}

export default Navbar
