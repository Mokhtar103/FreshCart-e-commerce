import React from 'react'
import styles from './MainSlider.module.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const images = [
    {
      src: require('../../assets/images/slider-image-3.jpeg'),
      name: "slider1",
    },
    {
      src: require('../../assets/images/slider-image-2.jpeg'),
      name: "slider2",
    },
    {
      src: require('../../assets/images/slider-image-1.jpeg'),
      name: "slider3",
    },
  ]

  return (
    <section className='py-5'>
      <div className="container">
        <div className="row g-0">
          <div className="col-md-9">
          <Slider {...settings}>
          {
              images.map((image) => (
                <figure className='mb-0'>
                  <img src={image.src} alt={image.name} className={styles.mainImg} />
                </figure>
              ))
            }
          </Slider>  
          </div>
          <div className="col-md-3">
          <figure className='mb-0'>
                  <img src={require('../../assets/images/grocery-banner.png')} alt="" className={styles.sideImg} />
                </figure>
                <figure className='mb-0'>
                  <img src={require('../../assets/images/grocery-banner-2.jpeg')} alt="" className={styles.sideImg} />
                </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
