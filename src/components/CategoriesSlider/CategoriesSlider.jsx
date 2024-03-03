import React from 'react'
import styles from './CategoriesSlider.module.scss'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loader from '../Loader/Loader'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider() {

  function getCategoryProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false
  };

  const  {data, isError, isLoading, error} = useQuery('CategoryProducts', getCategoryProducts)
  return (
    <section className='py-5'>

      {
        isLoading && <Loader/>
      }
      <div className="container">

        {
          isError && <div className='alert alert-danger'>{error.message}</div>
        }
       {
        data?.data.data && (
          <div className="row">
          
          <Slider {...settings}>
          {
            data.data.data.map((category) => (
              <div className="col-2">
              <figure>
              <img src={category.image} alt={category.name} className='img-fluid' style={{width: "100%", height: "200px"}} />
              <h3 className='h6'>{category.name}</h3>
            </figure>
             </div>
            ))
          }
    </Slider>
            
         
        </div>
        )
       }
      </div>
    </section>
  )
}
