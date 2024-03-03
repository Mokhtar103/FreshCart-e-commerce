import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.scss'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify';
import { wishContext } from '../../Context/WishContext';




export default function ProductDetails() {

  const {addToCart} = useContext(CartContext)
  const {addToWish, getWishList, wishList, setwishList} = useContext(wishContext);
  const [wishListIds, setwishListIds] = useState([])


  const { id } = useParams();
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  async function getWishListBridge() {
    const data = await getWishList()

    if(data?.status === "success"){
      setwishList(data?.data)
      wishList?.forEach(element => {
        setwishListIds(prevArray => [...prevArray, element.id]);
      });
    }
  }
  useEffect(() => {
    getWishListBridge()
    
  }, [wishList , wishListIds])

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

  async function addProductToWish(id) {
    let response = await addToWish(id);
    console.log('res', response);
    
    if(response.status == "success") {
      toast.success(response.message, {
        position: "bottom-right",
        theme: "dark"
      })
    } else {
      response.error("Failed to add to cart",
      {
        position: "bottom-right",
        theme: "dark"
      })
    }
    
  }

  const {data, isError, isLoading, error} = useQuery('productDetauls', getProductDetails )
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (

    
    <section className='py-5 min-vh-100'>
      
     {
      isLoading && <Loader/>
     }

     
      <div className="container">
      {
       isError && <div className='alert alert-danger'>{error.message}</div>
     }
     {
      data?.data.data && (
        <div className="row align-items-center">
        <div className="col-md-3">

        <Slider {...settings}>
          {
            data.data.data.images.map( (img) => (
           <figure>
             <img className='img-fluid' src={img} alt={data.data.data.title} />
           </figure>
            ))
          }
        
        </Slider>
           
         </div>
         <div className="col-md-9">

         <Helmet>
       <meta charSet="utf-8" />
      <title>{data.data.data.title}</title>
      <meta name='keywords' content={data.data.data.slug} />
    </Helmet>
         <h3>{data.data.data.title}</h3>
         <p className='text-muted'>{data.data.data.description}</p>
         
               
               <div className="d-flex justify-content-between">
              <div>
              <h4 className='h6 mb-2 text-success fw-bolder'>{data.data.data.category.name}</h4>
              <h4 className='h6'>{data.data.data.price} EGP</h4>
              </div>
               <h4 className='h6'>
                 <i className='fas fa-star text-warning'></i>
                 {data.data.data.ratingsAverage}
               </h4>
               
         </div>
         <button onClick={() => addProductToWish(id)} className='btn w-25 m-0'>
                        <i  className="fa-solid fa-heart m-0  "></i>
              </button>
         <button onClick={() => addProductToCart(id)} className='btn btn-success w-100 bg-main mt-3'>Add to Cart</button>
     </div>
        </div>
      )
     }
      </div>
    </section>
  )
}
