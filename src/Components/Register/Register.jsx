import React from 'react'
import styleRegister from './Register.module.css'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRegister } from '../../Redux/sliceRegister';

export default function Register() {

  const { data_Register, loading_Register, error_Register } = useSelector((state) => state.ApisliceRegister);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = Yup.object({
    firstName: Yup.string().required('name is Required').min(3, 'min is 3').max(10, 'max is 10'),
    lastName: Yup.string().required('name is Required').min(3, 'min is 3').max(10, 'max is 10'),
    userName: Yup.string().required('name is Required').min(3, 'min is 3'),
    email: Yup.string().required('email is Required').email('email is invalid'),
    password: Yup.string().required('Please Enter your password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    confirmPassword: Yup.string().required('confirm Password is Required').oneOf([Yup.ref('password')], 'password and confirm Password does not match'),
    phoneNumber: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'is not a egyption phone'),
    userRole: Yup.string().required("user Role is required")
  })

  function funFailfiald(values) {
    console.log(values)
    dispatch(getRegister(values)).then((response) => {
      console.log(response.payload.message);
      if (response.payload.message == 'Added Successfully') {
        navigate('/Login')
      }
    })
  }
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      userRole: ''
    },
    validationSchema: validate,
    onSubmit: funFailfiald,
  })

  return <>

    <main className='py-3 pt-5 mt-5'>
      <div className='container'>
        <div className='row'>
          <div className={`${styleRegister.displaysm} col-6`}>
            <div className='d-flex justify-content-center position-relative'>
              <img className={styleRegister.up_down_img} loading='lazy' src={require('../../Img/Login/Left.png')} alt="" />
            </div>
          </div>
          <div className='col-lg-6 col-12 '>
            <div className='h-100 row align-items-center'>

              <form onSubmit={formik.handleSubmit}>

                <div className="d-flex justify-content-between ">
                  <div style={{width:'48%'}} className="mb-4">
                    <label htmlFor="firstName" className="form-label fw-medium">first Name</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='firstName' value={formik.values.firstName} type="text" className="form-control" id="firstName" placeholder="&#xf007; &nbsp; first Name" />
                    {formik.errors.firstName && formik.touched.firstName ? <div className='alert alert-danger p-3'>{formik.errors.firstName}</div> : null}
                  </div>

                  <div style={{width:'48%'}} className="mb-4">
                    <label htmlFor="lastName" className="form-label fw-medium">last Name</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='lastName' value={formik.values.lastName} type="text" className="form-control" id="lastName" placeholder="&#xf007; &nbsp; last Name" />
                    {formik.errors.lastName && formik.touched.lastName ? <div className='alert alert-danger p-3'>{formik.errors.lastName}</div> : null}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="userName" className="form-label fw-medium">full Name</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='userName' value={formik.values.userName} type="text" className="form-control" id="userName" placeholder="&#xf007; &nbsp; cristiano ronaldo" />
                  {formik.errors.userName && formik.touched.userName ? <div className='alert alert-danger p-3'>{formik.errors.userName}</div> : null}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-medium">Email address</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value={formik.values.email} type="email" className="form-control" id="email" placeholder="&#xf0e0; &nbsp; name@.com" />
                  {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
                </div>

                <div className="mb-4">
                  <label htmlFor="Password" className="form-label fw-medium">Password</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' value={formik.values.password} type="password" className="form-control" id="password" placeholder="&#xf023; &nbsp; &nbsp; ***************" />
                  {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label fw-medium">Confirm password</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='confirmPassword' value={formik.values.confirmPassword} type="password" className="form-control" id="confirmPassword" placeholder="&#xf023; &nbsp; &nbsp; ***************" />
                  {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className='alert alert-danger'>{formik.errors.confirmPassword}</div> : null}
                </div>

                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="form-label fw-medium">phone Number</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='phoneNumber' value={formik.values.phoneNumber} type="tel" className="form-control" id="phoneNumber" placeholder="&#xf095; &nbsp; &nbsp; 0123456789" />
                  {formik.errors.phoneNumber && formik.touched.phoneNumber ? <div className='alert alert-danger'>{formik.errors.phoneNumber}</div> : null}
                </div>

                <div className="mb-4" aria-labelledby="my-radio-group">
                  <p className='fw-semibold'>user Role</p>
                  <input className="form-check-input me-2" onChange={formik.handleChange} onBlur={formik.handleBlur} value={"Student"} type="radio" name="userRole" id="StudentRadio" />
                  <label className="form-check-label me-4" htmlFor="StudentRadio">
                    student
                  </label>
                  <input className="form-check-input me-2" onChange={formik.handleChange} onBlur={formik.handleBlur} value={"Teacher"} type="radio" name="userRole" id="teacherRadio" />
                  <label className="form-check-label" htmlFor="teacherRadio">
                    teacher
                  </label>
                  {formik.errors.userRole && formik.touched.userRole ? <div className='alert alert-danger'>{formik.errors.userRole}</div> : null}
                </div>


                {loading_Register ? <button disabled className='btn bgMain w-100 my-3 text-white fw-semibold'><i className='fa fa-spinner fa-spin'></i></button>
                  : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bgMain w-100 my-3 text-white fw-semibold">Submit</button>}

                {error_Register != null ? <div className='alert alert-danger fw-medium text-center'>{error_Register}</div> : null}

                <p className='text-center fw-medium'>I Alredy have an Account ? <Link to="/Login">Sign in</Link></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </main>

  </>
}
