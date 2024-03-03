import React, { useContext, useEffect, useState } from 'react'
import styles from './WishList.module.scss'
import { wishContext } from '../../Context/WishContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet'




export default function WishList() {

  const {getWishList, removeFromWish} = useContext(wishContext)
  const {addToCart} = useContext(CartContext)
  const [wishDetails, setWishDetails] = useState(null);

  async function getWishDetails() {
    const data = await getWishList();
    setWishDetails(data);
    if(data?.status == "success") {
      setWishDetails(data);
    } else {
      setWishDetails(null);
    }
    console.log(data);
  }

  async function removeProductFromWish(id) {
    const data = await removeFromWish(id);
    console.log(data);
    if(data?.status == "success") {
      getWishDetails();
      toast.success(data.message, {
        theme: "dark",
        position: "bottom-right"
      })
    } else {
      toast.error(data.message, {
        theme: "dark",
        position: "bottom-right"
      })
    }
  }

  async function addToCartAndRemove(id) {
    const data = await addToCart(id);
    if(data?.status == "success") {
      toast.success(data.message, {
        theme: "dark",
        position: "bottom-right"
      })
    } else {
      toast.error(data.message, {
        theme: "dark",
        position: "bottom-right"
      })
    }

    removeProductFromWish(id);
  }

  useEffect(() => {
    getWishDetails();
  }, [])
  return (
    <section className='py-5'>
      <Helmet>
        <title>Wish List</title>
      </Helmet>
       <h2 className='text-center text-success mb-3'>Wish List</h2>
    <div className="container">
    {
        wishDetails ? (
          <section className='p-5 bg-light'>
            
         {
          wishDetails.data.map((product) =>  (
            <div className="row border-bottom py-3 my-3">
            <div className="col-md-1">
              <figure>
                <img className='img-fluid' src={product.imageCover} alt={product.title} />
              </figure>
            </div>
            <div className="col-md-9">
              <h3 className='h5'>{product.title}</h3>
              <h3 className='h6 text-success'>{product.price} EGP</h3>
              <button onClick={() => removeProductFromWish(product.id)} className='text-danger border-0 bg-transparent'>
                <i className='fa fa-trash me-2'></i> Remove
              </button>
            </div>
            <div className="col-md-2">
              <button onClick={() => addToCartAndRemove(product.id)} className='btn btn-success text-white'>Add To Cart</button>
            </div>
          </div>
          ))
         }
          </section>
        ) : (
          <h2>There is no products in your wish list, you can continue shopping from <Link to={'/products'} className={styles.linkTo}>Here</Link></h2>
        )
      }
    </div>
    </section>
  )
}
