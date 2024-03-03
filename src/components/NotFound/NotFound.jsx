import React from 'react'
import styles from './NotFound.module.scss'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
   <section className='py-5'>
    <Helmet>
        <title>Sorry!</title>
      </Helmet>
      <div className='text-center'>
      <img src={require('../../assets/images/error.svg')} alt="not found" />
      </div>
   </section>
  )
}
