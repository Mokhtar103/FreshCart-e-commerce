import React from 'react'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <>
    <footer className='bg-light p-5 mt-3'>
      <h3>Get the FreshCart app</h3>
      <p className='text-muted'>We will send you a link, open it on your phone to download the app</p>
      <form action="" className='d-flex my-3'>
        <input type="email" placeholder='Email ..' className='w-75 form-control' />
        <button className='btn bg-success ms-3 text-white w-25'>Share App Link</button>
      </form>

      <div className="d-flex border-top border-bottom justify-content-between my-3">
        <div className='d-flex mx-3 align-items-center my-3'>
          <h6>Payment Partners</h6>
          <img className='mx-1 img-fluid' width={50} src={require('../../assets/images/amazon.png')} alt="" />
          <img className='mx-1 img-fluid' width={50} src={require('../../assets/images/AmericanExpress.png')} alt="" />
          <img className='mx-1 img-fluid' width={50} src={require('../../assets/images/masterCard.png')} alt="" />
          <img className='mx-1 img-fluid' width={50} src={require('../../assets/images/paypal.png')} alt="" />
        
        </div>
        <div className="d-flex my-3 mx-3 align-items-center">
          <h6>Get Deliveries with FreshCart</h6>
          <img className='mx-1 img-fluid' width={100} src={require('../../assets/images/appleStore.png')} alt="" />
          <img className='mx-1 img-fluid' width={100} src={require('../../assets/images/googlePlay.png')} alt="" />
        </div>
      </div>
  
    </footer>
    
    </>
  )
}
