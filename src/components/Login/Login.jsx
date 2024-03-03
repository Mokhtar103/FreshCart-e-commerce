import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss'
import { AuthContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {setUserToken} = useContext(AuthContext)
  const initialValues = {
    email: "",
    password: "",
   
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().matches(/^[A-Z][A-Za-z0-9_]{2,11}$/i, "Invalid Password").required("Password is required"),

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
   .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
   .then ((res) => {
    console.log(res);
    if(res.data.message == "success") {
      setLoading(false);
      setError(null)
      console.log(res.data.token);
      setUserToken(res.data.token)
      localStorage.setItem("token", res.data.token)
      navigate('/home')
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
                <title>Login</title>
    </Helmet>
      <div className="container">
        {
          error && (
            <div className='alert alert-danger'>{error}</div>
          )
        }
      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
      <h1>Login Now</h1>
   
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
  <label htmlFor="password" className="form-label">Password</label>
  <input type="password" className="form-control" id="password" placeholder="Enter Your Password"  onChange={formik.handleChange}
  value={formik.values.password}
  onBlur={formik.handleBlur}/>
   { formik.errors.password && formik.touched.password && (
    <span className='text-danger'>{formik.errors.password}</span>
  )}
</div>
<button type='submit' className='btn btn-dark' disabled= {!(formik.isValid && formik.dirty)}>
  {loading ? "Loading..." : "Login"}
</button>
      </form>
      </div>
    </section>
  )
}
