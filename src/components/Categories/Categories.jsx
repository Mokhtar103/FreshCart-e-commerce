import React from 'react'
import styles from './Categories.module.scss'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet'



export default function Categories() {

  async function getCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

 const {data, isLoading, isError, error} = useQuery("getCategories", getCategories)
  return (
    <section className='py-5'>

      <Helmet>
        <title>Categories</title>
      </Helmet>

{
        isLoading && <Loader/>
      }

{
        isError && <div className='alert alert-danger'>{error.message}</div>
      }
      <div className="container">
        <div className="row g-4">
         {
          data?.data.data.map((cat, index) => (
            <div key={index} className="col-md-4 p-2 mb-3 rounded-2 cursor-pointer">
            <img height={400} width={200} className='w-100' src={cat.image} alt="" />
            <h3 className='text-success text-center my-4'>{cat.name}</h3>

          </div>
          ))
         }
        </div>
      </div>
    </section>
  )
}
