import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { getCreateSubject } from '../../Redux/SliceCreateSubject';
import { useState } from 'react';
import axios from 'axios';

export default function CreateContent() {
  const [ErrorCreate, setErrorCreate] = useState(null)
  // const { data_CreateSubject, loading_CreateSubject, error_CreateSubject } = useSelector((state) => state.ApiSliceCreateSubject);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(null)
  const { userToken } = useSelector((state) => state.ApisliceToken);

  const validate = Yup.object({
    subjectName: Yup.string().required('Name is Required'),
    subjectDescription: Yup.string().required('Please Enter your description'),
    period: Yup.string().required('Please Enter time course take'),
  })



  const getCourse = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`https://selpapi20240618171141.azurewebsites.net/SELP/V1/Subject/AddSubject`, values,
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );
      console.log(data)
      setLoading(false);
      if (data.statusCode == '201') {
        toast.success('Create Subject Successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        setTimeout(() => {
          navigate('/CreateContent');
        }, 2500);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
      return null;
    }
  };


  const formik = useFormik({
    initialValues: {
      subjectName: '',
      subjectDescription: '',
      period: '',
    },
    validationSchema: validate,
    onSubmit: getCourse,
  })

  return <>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
    />

    <main className='p-2 p-md-5 pt-5 mt-5' >
      <section className='m-1 m-md-5 p-4 rounded-4' style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 7px 20px rgba(0, 0, 0, 0.25)", border: '1px solid rgba(29, 29, 29, 0.1)' }}>

        <div className='my-5 text-center'>
          <h1 className='fw-bolder' style={{ color: "#472758" }}>Create new Subject</h1>
        </div>

        <form onSubmit={formik.handleSubmit}>

          <div className="mb-4">
            <label htmlFor="subjectName" className="form-label fw-medium">Subject Name</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.subjectName} name='subjectName' type="text" className="form-control border-3" id="subjectName" placeholder="subject Name" />
            {formik.errors.subjectName && formik.touched.subjectName && <div className='alert alert-danger'>{formik.errors.subjectName}</div>}
          </div>

          <div className="mb-5">
            <label htmlFor="subjectDescription" className="form-label fw-medium">Subject description</label>
            <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.subjectDescription} style={{ resize: 'none' }} className="form-control border-3" name='subjectDescription' id="subjectDescription" rows="3" placeholder="subject Description"></textarea>
            {formik.errors.subjectDescription && formik.touched.subjectDescription ? <div className='alert alert-danger'>{formik.errors.subjectDescription}</div> : null}
          </div>

          <div className="mb-5">
            <label htmlFor="period" className="form-label fw-medium">period</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.period} type='number' className="form-control border-3" name='period' id="period" placeholder="period"></input>
            {formik.errors.period && formik.touched.period ? <div className='alert alert-danger'>{formik.errors.period}</div> : null}
          </div>

          {Loading ? <button disabled className='btn bgMain w-100 my-3 text-white fw-semibold'><i className='fa fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bgMain w-100 my-3 text-white fw-semibold">Create Subject</button>}

          <p className='text-center fw-medium'><Link to="/CreateContent">Have Already Subject</Link></p>

          {Error !== null ? <div className='alert alert-danger fw-medium text-center'>{Error}</div> : null}
        </form>

      </section>
    </main>
  </>
}