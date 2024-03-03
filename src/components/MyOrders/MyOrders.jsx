import React, { useContext, useState, useEffect } from 'react'
import styles from './MyOrders.module.scss'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function MyOrders() {

  const {userId} = useContext(AuthContext)
  const [Orders, setOrders] = useState(null)

  async function getMyOrders(){
    try {

      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      console.log(data);
      if(data?.length) {
        setOrders(data)
      } else {
        setOrders(null)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
   getMyOrders();
  }, [])
  
  return (
    <section className='py-5'>
      <div className="container">
        <h1 className='text-center my-4 text-success'>My Orders</h1>
        {
          Orders? (
            Orders.map((order) => (
              <div className="row mb-5 bg-info rounded-2">
                <span className='h4 me-3'>Total Cost: {order.totalOrderPrice} EGP</span>
                <span className='h4'>Payment Method: {order.paymentMethodType}</span>
                <h3>Your city is:  {order.shippingAddress.city}</h3>
                <h3>Your phone is: {order.shippingAddress.phone}</h3>
                {
                  order.cartItems.map((item) => (
                    <div className="col-md-2 mb-3">
                      <img className='img-fluid mb-3' src={item.product.imageCover} alt="" />
                      <h4 className='h6 mb-2 text-success fw-bolder'>{item.product.category.name}</h4>
                      <h3 className='h6 mb-2 fw-bolder'>{item.product.title.split(' ').splice(0,4).join(' ')}</h3>
                      <div className="d-flex justify-content-between">
              <h4 className='h6'>{item.price} EGP</h4>
              <h4 className='h6'>
                <i className='fas fa-star text-warning'></i>
                {item.product.ratingsAverage}
              </h4>
              </div>
                    </div>
                  ))
                }
              </div>
            ))
          ) : (
            <h2>There is no orders yet, you can order products from <Link to={'/products'}>Here</Link></h2>
          )
        }

      </div>
    </section>
  )
}
