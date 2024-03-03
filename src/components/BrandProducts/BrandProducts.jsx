import React, { useContext, useEffect, useState } from 'react'
import styles from './BrandProducts.module.scss'
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

export default function BrandProducts() {

  const {addToCart} = useContext(CartContext);
  const {id, filterId} = useParams();

  async function getBrandProducts() {
    return await axios.get("https://route-ecommerce.onrender.com/api/v1/products", {
      params:  {[filterId]: id}
    })
  }

 const {data, isLoading, isError, error} = useQuery('brandProducts', getBrandProducts)
 console.log(data);

  async function addProductToCart(id){
    let response = await addToCart(id);

    console.log(response);

    if(response.status == "success") {
      toast.success(response.message, {
        position: "bottom-right",
        theme: "dark"
      })
    } else {
      response.error("Failed to add to cart")
    }
  }
  return (
    <section className='py-5'>
       {
        isLoading && <Loader/>
      }
      {
        isError && <div className='alert alert-danger'>{error.message}</div>
      }
      <div className="container">
        <div className="row">
          {
             data?.data.data.map((product) => (
              <div key={product.id} className="col-md-2">
              <div className="product mb-3 p-2 cursor-pointer">
              <Link to={`/product-details/${product.id}`} className='text-decoration-none text-black'>
              <img className='img-fluid mb-2' src={product.imageCover} alt={product.title} />
              <h4 className='h6 mb-2 text-success fw-bolder'>{product.category.name}</h4>
              <h3 className='h6 mb-2 fw-bolder'>{product.title.split(' ').splice(0,4).join(' ')}</h3>
              <div className="d-flex justify-content-between">
              <h4 className='h6'>{product.price} EGP</h4>
              <h4 className='h6'>
                <i className='fas fa-star text-warning'></i>
                {product.ratingsAverage}
              </h4>
              </div>
              </Link>
              <button onClick={() => addProductToCart(product.id)} className='btn btn-success w-100 bg-main'>Add to Cart</button>
             
              </div>
            </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
