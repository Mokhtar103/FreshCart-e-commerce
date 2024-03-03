import React from 'react';
import styles from './Brands.module.scss';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'



export default function Brands() {

 async function getAllBrands() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/brands")
  }

  const {data, isLoading, isError, error} = useQuery('brands', getAllBrands)
  return (
    <section className='py-5'>
       <Helmet>
        <title>Brands</title>
      </Helmet>
      <h1 className='text-success text-center mb-5'>All Brands</h1>
        {
        isLoading && <Loader/>
      }
      {
        isError && <div className='alert alert-danger'>{error.message}</div>
      }
      <div className="container">
        <div className="row">
          {
            data?.data.data.map((brand) => (
              <div key={brand._id} className="col-md-3 ">
                <Link className='text-decoration-none text-dark' to={`/BrandProducts/brand/${brand._id}`}>
                <div className='border rounded-2 mb-3 cursor-pointer'>
                <img src={brand.image} alt="" />
                <h6 className='text-center fw-normal'>{brand.name}</h6>
                </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
