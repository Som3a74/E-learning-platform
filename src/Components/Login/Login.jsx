import React, { useRef } from 'react'
import styleLogin from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { replace, useFormik } from 'formik';
import { getLogin } from '../../Redux/SliceLogin';
import { ToastContainer, toast } from 'react-toastify';
import { saveToken } from '../../Redux/sliceToken';

export default function Login() {

  const {data_login , loading_login, errors_login} = useSelector((state)=> state.ApiSliceLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forms = document.querySelector('form')

  const validate = Yup.object({
    Email      : Yup.string().required('email is Required').email('email is invalid'),
    Password   : Yup.string().required('Please Enter your password')
  })

 
  function funFailfiald(values) {
    const formData = new FormData(forms);
    const data = [...formData.entries()]
   
    dispatch(getLogin(data)).then((response) => {
    console.log(response)

      if (response.payload.message == 'Added Successfully') {
        dispatch(saveToken(response.payload.data))
        navigate('/' , { replace: true } )
      }
    })
  }

  const formik = useFormik({
    initialValues : {
      Email      : '',
      Password   : '',
    },
    validationSchema : validate ,
    onSubmit : funFailfiald ,
  })



  return <>

  <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
    theme="light"
  />

  <main className='py-3 pt-5 mt-5'>
    <div className='container'>
      <div className={`${styleLogin.vh_70_login}  row`}>
        <div className={ `${styleLogin.displaysm} col-6`}> 
          <div className='d-flex justify-content-center position-relative'>
            <img className={styleLogin.up_down_img} loading='lazy' src={require('../../Img/Login/Left.png')} alt="" />
          </div>
        </div>

        <div className='col-lg-6 col-12'>
          <div className='h-100 row align-items-center'>
          <form onSubmit={formik.handleSubmit} >

            <div className="mb-4">
              <label htmlFor="Email" className="form-label fw-medium">Email address</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='Email' value={formik.values.Email} type="email" className="form-control" id="Email" placeholder="&#xf0e0; &nbsp; name@.com" />
              {formik.errors.Email && formik.touched.Email ? <div className='alert alert-danger'>{formik.errors.Email}</div>:null }
            </div>

            <div className="mb-4">
              <label htmlFor="Password" className="form-label fw-medium">Password</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='Password' value={formik.values.Password} type="password" className="form-control" id="Password" placeholder="&#xf023; &nbsp; &nbsp; ***************" />
              {formik.errors.Password && formik.touched.Password ? <div className='alert alert-danger'>{formik.errors.Password}</div>:null }
            </div>

            {loading_login ? <button disabled className='btn bgMain w-100 my-3 text-white fw-semibold'><i className='fa fa-spinner fa-spin'></i></button>
            :<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bgMain w-100 my-3 text-white fw-semibold">Submit</button>}

            {errors_login != null ? <div className='alert alert-danger fw-medium text-center'>{errors_login}</div> : null}

            <p className='text-center fw-medium'><Link to="/Register">Craete account now</Link></p>

          </form>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  </>
}
