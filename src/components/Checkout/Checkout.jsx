import React, { useContext, useState } from 'react'
import styles from './Checkout.module.scss'
import * as Yup from "yup";
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {

 const {cartId, setNumOfCartItems} = useContext(CartContext)
 const [isOnline, setIsOnline] = useState(false);
 const navigate = useNavigate();
 const headers = {
  token: localStorage.getItem("token"),
}

  const initialValues = {
    details: "",
    phone: "",
    city: ""
  }

  const validationSchema = Yup.object({

    phone: Yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    , "Invalid phone number").required("Phone is required"),
    city: Yup.string().matches(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/).required("City is required"),
    details: Yup.string().required("The details are required")
   })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handlePayment(values),
  });

  async function handlePayment(values) {
    console.log(values, cartId);

    const endpoint = isOnline ? 
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
    : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`


    try {
     const {data} = await axios.post(endpoint, {shippingAddress: values}, {headers});

     if(data.status == "success") {
      toast.success("Order placed Successfully", {
        theme: "dark",
        position: "bottom-right"
      })
      setNumOfCartItems(0);

      if (isOnline) {
        window.location.href = data.session.url;
      } else {
        setTimeout(() => {
          navigate('/allorders')
        }, 3000)
      }
     
     } else {
      toast.error("Oops something went wrong", {
        theme: "dark",
        position: "bottom-right"
      })
     }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='py-5'>
      <div className="container">
      <h2>Checkout</h2>

    <form onSubmit={formik.handleSubmit}>
    <div className="form-group mb-3">
        <label htmlFor="phone">Phone</label>
        <input type="tel" className='form-control' name="phone" id="phone" placeholder='Phone' onChange={formik.handleChange}
  value={formik.values.phone}
  onBlur={formik.handleBlur} />
  { formik.errors.phone && formik.touched.phone && (
    <span className='text-danger'>{formik.errors.phone}</span>
  )}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="city">City</label>
        <input type="text" className='form-control' name="city" id="city" placeholder='City' onChange={formik.handleChange}
  value={formik.values.city}
  onBlur={formik.handleBlur} />
  { formik.errors.city && formik.touched.city && (
    <span className='text-danger'>{formik.errors.city}</span>
  )}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="details">Details</label>
        <textarea className='form-control' name="details" placeholder='Details' id="details" cols='30' rows='3' onChange={formik.handleChange}
  value={formik.values.details}
  onBlur={formik.handleBlur}></textarea>
  { formik.errors.details && formik.touched.details && (
    <span className='text-danger'>{formik.errors.details}</span>
  )}
      </div>
    <div className="d-flex align-items-center">
    <input type="checkbox" className='form-check-input me-2' onChange={() => setIsOnline(!isOnline)} /> Online Payment
    {
      isOnline ? (
        <button type='submit' className='btn btn-success ms-3'>Online Payment</button>
      ) : (
        <button type='submit' className='btn btn-success ms-3'>Cash Payment</button>
      )
    }
    </div>
    </form>
      </div>
    </section>
  )
}
