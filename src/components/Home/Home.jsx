import React from 'react'
import styles from './Home.module.scss'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import { Helmet } from 'react-helmet';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';

export default function Home() {
  return (
<>
<Helmet>
       <meta charSet="utf-8" />
                <title>Home</title>
    </Helmet>
    <MainSlider/>
    <CategoriesSlider/>
<FeaturedProduct/>
</>
  )
}
