import React from 'react'
import './Navbar.css'
import logo from '../assets/oc.jpg'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
      <div className="logo">
        <img src={logo} alt="" />
        <h2>Online Connector</h2>
      </div>
      <Link to="/admin">
      <div className="btn">ADMIN</div>
      </Link>
    </div>
  )
}

export default Navbar
