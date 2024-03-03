import React, { useContext } from 'react'
import styles from './Navbar.module.scss'
import { Link, NavLink } from 'react-router-dom'

import logo from "../../assets/images/freshcart-logo.svg"
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {

 const {userToken, setUserToken} =  useContext(AuthContext);
 const {numOfCartItems} = useContext(CartContext);
 function handleLogout() {
  setUserToken(null);
  localStorage.removeItem("token")
 }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/home"><img src={logo} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {
      userToken && (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/products">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/categories">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/brands">Brands</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/wishlist">Wish List</NavLink>
          </li>
          <li className="nav-item position-relative">
            <NavLink className="nav-link" to="/cart">
            <i class="fa-solid fa-cart-shopping text-dark"></i>
              <span class="position-absolute mt-1 top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {numOfCartItems}
    <span class="visually-hidden">unread messages</span>
    </span>
            </NavLink>
          </li>

         
        
        </ul>
      )
     }

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <li><a href="https://www.facebook.com/" className='mx-2 text-black' target='_blank'><i class="fa-brands fa-facebook"></i></a></li>
        <li><a href="https://www.twitter.com/" className='mx-2 text-black' target='_blank'><i class="fa-brands fa-twitter"></i></a></li>
        <li><a href="https://www.Tiktok.com/" className='mx-2 text-black' target='_blank'><i class="fa-brands fa-tiktok"></i></a></li>
        <li><a href="https://www.instagram.com/" className='mx-2 text-black' target='_blank'><i class="fa-brands fa-instagram"></i></a></li>
        <li><a href="https://www.linkedin.com/" className='mx-2 text-black' target='_blank'><i class="fa-brands fa-linkedin"></i></a></li>
        <li><a href="https://www.youtube.com/" className='mx-2 text-black' target='_blank'><i class="fa-brands fa-youtube"></i></a></li>


{
  userToken ? (
<>
<li className="nav-item">
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={handleLogout}>Logout</NavLink>
        </li>
        </>
  ) : (
    <>
 <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
    </>
  )
}
   
       
       
      
      </ul>
    
    </div>
  </div>
</nav>
    </>
  )
}
