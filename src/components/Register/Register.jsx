import React, { useState } from 'react'
import styles from './Register.module.scss'
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Register() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().matches(/^[A-Z][A-Za-z0-9_]{2,11}$/i, "Invalid Password").required("Password is required"),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], "the passwords must match"),
    phone: Yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
, "Invalid phone number").required("Phone is required"),

  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleRegister(values),
  });

  async function handleRegister(values) {
    console.log(values);
    setLoading(true)
   let {data} = await axios
   .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
   .then ((res) => {
    console.log(res);
    if(res.data.message == "success") {
      setLoading(false);
      setError(null)
      navigate('/login')
    }
   })
   .catch((err) => {
    console.log(err);
    setError(err.response.data.message)
    setLoading(false)
   })

    
    
  }
  return (
    <section className='py-5 min-vh-100'>
      <Helmet>
       <meta charSet="utf-8" />
       <title>Register</title>
    </Helmet>
      <div className="container">
        {
          error && (
            <div className='alert alert-danger'>{error}</div>
          )
        }
      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
      <h1>Register Now</h1>
      <div className="my-3">
  <label htmlFor="name" className="form-label">Name</label>
  <input type="text" className="form-control" id="name" placeholder="Enter Your Name"
  onChange={formik.handleChange}
  value={formik.values.name}
  onBlur={formik.handleBlur}/>
  { formik.errors.name && formik.touched.name && (
    <span className='text-danger'>{formik.errors.name}</span>
  )}
</div>
<div className="mb-3">
  <label htmlFor="email" className="form-label">Email</label>
  <input type="email" className="form-control" id="email" placeholder="Enter Your Email"  onChange={formik.handleChange}
  value={formik.values.email}
  onBlur={formik.handleBlur}/>
   { formik.errors.email && formik.touched.email && (
    <span className='text-danger'>{formik.errors.email}</span>
  )}
</div>
<div className="mb-3">
  <label htmlFor="phone" className="form-label">Phone</label>
  <input type="tel" className="form-control" id="phone" placeholder="Enter Your Phone"  onChange={formik.handleChange}
  value={formik.values.phone}
  onBlur={formik.handleBlur}
  />
   { formik.errors.phone && formik.touched.phone && (
    <span className='text-danger'>{formik.errors.phone}</span>
  )}
</div>
<div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
  <input type="password" className="form-control" id="password" placeholder="Enter Your Password"  onChange={formik.handleChange}
  value={formik.values.password}
  onBlur={formik.handleBlur}/>
   { formik.errors.password && formik.touched.password && (
    <span className='text-danger'>{formik.errors.password}</span>
  )}
</div>
 <div className="mb-3">
  <label htmlFor="rePassword" className="form-label"> Confirm password</label>
  <input type="password" className="form-control" id="rePassword" placeholder="Confirm password"  onChange={formik.handleChange}
  value={formik.values.rePassword}
  onBlur={formik.handleBlur}/>
   { formik.errors.rePassword && formik.touched.rePassword && (
    <span className='text-danger'>{formik.errors.rePassword}</span>
  )}
</div>
<button type='submit' className='btn btn-dark' disabled= {!(formik.isValid && formik.dirty)}>
  {loading ? "Loading..." : "Register"}
</button>
      </form>
      </div>
    </section>
  )
}
