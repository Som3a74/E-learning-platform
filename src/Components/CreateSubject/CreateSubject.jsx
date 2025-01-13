import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

export default function CreateContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userToken } = useSelector((state) => state.ApisliceToken);
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    subjectName: Yup.string().required('Subject Name is required'),
    subjectDescription: Yup.string().required('Please enter a description'),
    period: Yup.string().required('Please enter the course duration'),
  });

  // API Request
  const createCourse = async (values) => {
    setLoading(true);
    setError(null);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('SubjectName', values.subjectName);
      formData.append('SubjectDescription', values.subjectDescription);
      formData.append('Period', values.period);

      const { data } = await axios.post(
        '${process.env.REACT_APP_END_POINT_API}/SELP/V1/Subject/AddSubject',
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            // No need to specify Content-Type, axios will handle it for us
          },
        }
      );

      setLoading(false);

      if (data) {
        toast.success('Subject created successfully!', {
          position: 'top-right',
          autoClose: 2000,
          theme: 'colored',
        });

        setTimeout(() => {
          navigate('/CreateContent');
        }, 2500);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      
      if (err.response?.status === 400 && err.response.data.errors) {
        setError(err.response.data.errors.SubjectName?.[0] || 'Validation error');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      subjectName: '',
      subjectDescription: '',
      period: '',
    },
    validationSchema,
    onSubmit: createCourse,
  });

  return (
    <>
      <ToastContainer autoClose={2000} theme="colored" />
      <main className="p-2 p-md-5 pt-5 mt-5">
        <section
          className="m-1 m-md-5 p-4 rounded-4"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 7px 20px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(29, 29, 29, 0.1)',
          }}
        >
          <div className="my-5 text-center">
            <h1 className="fw-bolder" style={{ color: '#472758' }}>
              Create New Subject
            </h1>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {/* Subject Name */}
            <div className="mb-4">
              <label htmlFor="subjectName" className="form-label fw-medium">
                Subject Name
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subjectName}
                name="subjectName"
                type="text"
                className="form-control border-3"
                id="subjectName"
                placeholder="Subject Name"
              />
              {formik.errors.subjectName && formik.touched.subjectName && (
                <div className="alert alert-danger">{formik.errors.subjectName}</div>
              )}
            </div>

            {/* Subject Description */}
            <div className="mb-5">
              <label htmlFor="subjectDescription" className="form-label fw-medium">
                Subject Description
              </label>
              <textarea
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subjectDescription}
                className="form-control border-3"
                name="subjectDescription"
                id="subjectDescription"
                rows="3"
                placeholder="Subject Description"
                style={{ resize: 'none' }}
              />
              {formik.errors.subjectDescription && formik.touched.subjectDescription && (
                <div className="alert alert-danger">{formik.errors.subjectDescription}</div>
              )}
            </div>

            {/* Period */}
            <div className="mb-5">
              <label htmlFor="period" className="form-label fw-medium">
                Period
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.period}
                type="number"
                className="form-control border-3"
                name="period"
                id="period"
                placeholder="Course Duration"
              />
              {formik.errors.period && formik.touched.period && (
                <div className="alert alert-danger">{formik.errors.period}</div>
              )}
            </div>

            {/* Submit Button */}
            {loading ? (
              <button disabled className="btn bgMain w-100 my-3 text-white fw-semibold">
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bgMain w-100 my-3 text-white fw-semibold"
              >
                Create Subject
              </button>
            )}

            <p className="text-center fw-medium">
              <Link to="/CreateContent">Have Already Subject</Link>
            </p>

            {error && <div className="alert alert-danger fw-medium text-center">{error}</div>}
          </form>
        </section>
      </main>
    </>
  );
}
