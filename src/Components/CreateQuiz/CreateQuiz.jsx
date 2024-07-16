import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import LoadingPage from './../Loading/LoadingPage';

export default function CreateQuiz() {
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(null)
    const { userToken } = useSelector((state) => state.ApisliceToken);
    let { SubjectId } = useParams()

    const validate = Yup.object({
        name: Yup.string().required('Required'),
        question: Yup.string().required('Required'),
        correctAnswer: Yup.string().required('Required'),
        ans1: Yup.string().required('Required'),
        ans2: Yup.string().required('Required'),
        ans3: Yup.string().required('Required'),
        ans4: Yup.string().required('Required'),
        contentID: Yup.string().required('Required'),
    })

    const getQuiz = async (values) => {
        console.log(values)
        setLoading(true);
        try {
            const { data } = await axios.post(`https://selpapi20240618171141.azurewebsites.net/SELP/V1/Quiz/Create`, values,
                {
                    headers: { Authorization: `Bearer ${userToken}` }
                }
            );
            console.log(data)
            setLoading(false);
            if (data.statusCode == '201') {
                toast.success('Create Quiz Successfully', {
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
                    navigate('/');
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
            name: '',
            question: '',
            correctAnswer: '',
            ans1: '',
            ans2: '',
            ans3: '',
            ans4: '',
            contentID: '',

        },
        validationSchema: validate,
        onSubmit: getQuiz,
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
                    <h1 className='fw-bolder' style={{ color: "#472758" }}>Create new content</h1>
                </div>

                <form onSubmit={formik.handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label fw-medium">name</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name='name' type="text" className="form-control border-3" id="name" placeholder="name" />
                        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="question" className="form-label fw-medium">question</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.question} name='question' type="text" className="form-control border-3" id="question" placeholder="question" />
                        {formik.errors.question && formik.touched.question ? <div className='alert alert-danger'>{formik.errors.question}</div> : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="correctAnswer" className="form-label fw-medium">correctAnswer</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.correctAnswer} name='correctAnswer' type="text" className="form-control border-3" id="correctAnswer" placeholder="correctAnswer" />
                        {formik.errors.correctAnswer && formik.touched.correctAnswer ? <div className='alert alert-danger'>{formik.errors.correctAnswer}</div> : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ans1" className="form-label fw-medium">ans1</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ans1} name='ans1' type="text" className="form-control border-3" id="ans1" placeholder="ans1" />
                        {formik.errors.ans1 && formik.touched.ans1 ? <div className='alert alert-danger'>{formik.errors.ans1}</div> : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ans2" className="form-label fw-medium">ans2</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ans2} name='ans2' type="text" className="form-control border-3" id="ans2" placeholder="ans2" />
                        {formik.errors.ans2 && formik.touched.ans2 ? <div className='alert alert-danger'>{formik.errors.ans2}</div> : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ans3" className="form-label fw-medium">ans3</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ans3} name='ans3' type="text" className="form-control border-3" id="ans3" placeholder="ans3" />
                        {formik.errors.ans3 && formik.touched.ans3 ? <div className='alert alert-danger'>{formik.errors.ans3}</div> : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ans4" className="form-label fw-medium">ans4</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ans4} name='ans4' type="text" className="form-control border-3" id="ans4" placeholder="ans4" />
                        {formik.errors.ans4 && formik.touched.ans4 ? <div className='alert alert-danger'>{formik.errors.ans4}</div> : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contentID" className="form-label fw-medium">contentID : {SubjectId}  </label>
                        <div class="alert alert-warning" role="alert">
                            please enter {SubjectId} in contentID feild
                        </div>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contentID} name='contentID' type="text" className="form-control border-3" id="contentID" placeholder="contentID" />
                        {formik.errors.contentID && formik.touched.contentID ? <div className='alert alert-danger'>{formik.errors.contentID}</div> : null}
                    </div>


                    {Loading ? <button disabled className='btn bgMain w-100 my-3 text-white fw-semibold'><i className='fa fa-spinner fa-spin'></i></button>
                        : <button disabled={!(formik.isValid)} type="submit" className="btn bgMain w-100 my-3 text-white fw-semibold">Create Quiz</button>}

                    {Error !== null ? <div className='alert alert-danger fw-medium text-center'>{Error}</div> : null}

                </form>

            </section>
        </main>
    </>
}