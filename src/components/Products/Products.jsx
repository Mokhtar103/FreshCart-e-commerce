import React, {useContext, useEffect, useState } from 'react'
import styles from './Products.module.scss'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishContext } from '../../Context/WishContext';
import { Helmet } from 'react-helmet'



export default function Products() {

  const [searchProducts, setsearchProducts] = useState('')
  const [wishListIds, setwishListIds] = useState([])



  const {addToCart} = useContext(CartContext);
  const {addToWish, getWishList, wishList, setwishList} = useContext(wishContext);

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
      response.error("Failed to add to cart",
      {
        position: "bottom-right",
        theme: "dark"
      })
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
      getWishListBridge();
    } else {
      response.error("Failed to add to cart",
      {
        position: "bottom-right",
        theme: "dark"
      })
      getWishListBridge();
    }
    
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  const { data, isLoading, isError, error } = useQuery("productsQuery", getProducts);
  return (
    <section className='py-5'>
      <Helmet>
        <title>Products</title>
      </Helmet>
    {
      isLoading && <Loader/>
    }
    {
      isError && <div className='alert alert-danger'>{error.message}</div>
    }
   {
    data?.data.data && (
      <div className="container">
      <div className="row">

      <form action="" >
            <div className="text-center w-50 mx-auto my-5 d-flex align-items-center">
              <i className="fa-solid fa-magnifying-glass fs-4 mx-2"></i>
              <input type="search" className="form-control w-75"
                placeholder="Search... "
                value={searchProducts}
                onChange={(e)=>setsearchProducts(e.target.value)}
              />
            </div>
          </form>
      
        {
          data.data.data.map((product) => {
            
            if (
              product.title.toLowerCase().indexOf(searchProducts.toLowerCase()) === -1
            ) {
              return;
            }
           return (
            <div key={product.id} className="col-md-2">
            <div className="product mb-3 p-2 cursor-pointer">
            <Link to={`/product-details/${product.id}`} className={styles.links}>
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
            <button style={{ color: wishListIds?.includes(product.id) ? 'red' : 'black' }}
             onClick={() => addProductToWish(product.id)} className='btn w-25 m-0'>
                        <i  className="fa-solid fa-heart m-0  "></i>
              </button>
            <button onClick={() => addProductToCart(product.id)} className='btn btn-success w-100 bg-main'>Add to Cart</button>
           
            </div>
          </div>
           )
})
        }
      </div>
    </div>
    )
   }
  </section>
  )
}
