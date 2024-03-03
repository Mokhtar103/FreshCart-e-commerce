import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet'


export default function Cart() {

  const {getCart, numOfCartItems,  removeFromCart, clearCart, updateProductQty} = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const headers = {
    token: localStorage.getItem("token"),
}

//  async function getCartItems() {
//     return await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {headers});
//   }
  // const {isLoading, isError, error, data} = useQuery("getCartItems", getCartItems);
  // console.log( "data", data?.data.data);

  async function getCartDetails() {
    const data = await getCart();
    if(data?.status == "success") {
      setCartDetails(data);
    } else {
      setCartDetails(null);
    }
    console.log(data);
  }

  async function removeProductFromCart(id) {
    const data =  await removeFromCart(id)

    if(data.status == "success") {
      setCartDetails(data);
      toast.success("Product removed from cart successfully", {
        theme: "dark",
        position: "bottom-right"
      })
    } else {
      toast.error("Ops something went wrong", {
        theme: "dark",
        position: "bottom-right"
      })
    }
  }


  async function clearCartProducts() {
    const data = await clearCart();
    if(data.message == "success") {
      setCartDetails(null);
      toast.success("Cart Cleared Successfully", {
        theme: "dark",
        position: "bottom-right"
      })
    } else {
      toast.error("Oops something went wrong")
    }

  }

  async function updateProductQuantity() {
    const data = await updateProductQty();

    if (data.status == "success") {
      toast.success("Product Quantity Updated", {
        theme: "dark",
        position: "bottom-right"
      })
    } else {
      toast.error("Oops something went wrong")
    }
  }
 
  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <section className="py-5">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
        <h2 className='text-center text-success mb-3'>Shopping Cart</h2>
    <div className="container">
    {
        cartDetails ? (
          <section className='p-5 bg-light'>
            <div className="d-flex justify-content-between">
           
            <Link to={'/allorders'} className='btn btn-info text-white'>My Orders</Link>
            </div>
          <div className="d-flex justify-content-between mb-3">
             <h3 className='text-muted fw-light'>Total Price : <span className='text-success'>{cartDetails.data.totalCartPrice}</span></h3>
             <h3 className='text-muted fw-light'>Total Items : <span className='text-success'>{cartDetails.numOfCartItems}</span></h3>
           </div>
         {
          cartDetails.data.products.map((product) =>  (
            <div className="row border-bottom py-3 my-3">
            <div className="col-md-1">
              <figure>
                <img className='img-fluid' src={product.product.imageCover} alt={product.product.title} />
              </figure>
            </div>
            <div className="col-md-9">
              <h3 className='h5'>{product.product.title}</h3>
              <h3 className='h6 text-success'>{product.price} EGP</h3>
              <button onClick={() => removeProductFromCart(product.product.id)} className='text-danger border-0 bg-transparent'>
                <i className='fa fa-trash me-2'></i> Remove
              </button>
            </div>
            <div className="col-md-2">
              <button onClick={() => updateProductQuantity(product.product.id, product.count + 1)} className='btn btn-outline-success'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={() => updateProductQuantity(product.product.id, product.count - 1)} className='btn btn-outline-danger'>-</button>
            </div>
          </div>
          ))
         }
           <button onClick={clearCartProducts} className='btn btn-danger mb-3'>Clear Cart</button>
           <Link to={'/checkout'} className='btn btn-success w-100'>Checkout</Link>
          </section>
        ) : (
          <h2>There is no products in your cart, you can continue shopping from <Link to={'/products'} className={styles.linkTo}>Here</Link></h2>
        )
      }
    </div>

    </section>
  )
}
