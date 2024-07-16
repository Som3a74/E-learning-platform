import React, { useEffect, useState } from 'react'
import LoadingPage from '../Loading/LoadingPage'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function CourseDetails() {

    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(null)
    const [DataCourse, setDataCourse] = useState(null)
    let { SubjectId } = useParams()
    let navigate = useNavigate()

    const { userToken } = useSelector((state) => state.ApisliceToken);
    const getCourse = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(` https://selpapi20240618171141.azurewebsites.net/Content/SELP/V1/Content/${SubjectId}`,
                {
                    headers: { Authorization: `Bearer ${userToken}` }
                }
            );
            console.log(data)
            setDataCourse(data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'An error occurred');
            setLoading(false);
            return null;
        }
    };
    useEffect(() => {
        getCourse();
    }, [])

    const { decodeToken } = useSelector((state) => state.ApisliceToken);

    if (!decodeToken) {
      return <LoadingPage />
    }
    return <>
        {!Loading && DataCourse ?
            <main className='p-2 pt-5 mt-5' >
                <section className='m-1 m-md-5 p-4 rounded-4' style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 7px 20px rgba(0, 0, 0, 0.25)", border: '1px solid rgba(29, 29, 29, 0.1)' }}>

                    <div className='my-5 text-center'>
                        <h1 className='fw-bolder' style={{ color: "#472758" }}>Chapter :{DataCourse.name}</h1>
                    </div>

                    <div className='mb-4'>
                        <video className="w-100" controls src={DataCourse.video}></video>
                    </div>

                    <div className='mb-4'>
                        <h3 className='fw-bolder'>Description</h3>
                        <p className='fw-bold' style={{ color: "#645e5e" }}>{DataCourse.description}</p>
                    </div>

                    <div className='my-4'>
                        <a className="text-decoration-none text-black" href={DataCourse.pdf} target="_blank" download="document.pdf">
                            <i className="fa-solid fa-book mx-2"></i>pdf
                        </a>
                    </div>

                    <div className='my-4'>
                        <Link className='text-decoration-none text-black' onClick={() => navigate(`/Quiz/${SubjectId}`, { replace: true })}>
                            <img className='mx-2' src={require("../../Img/course-content/quiz icon.png")} alt="" />
                            quiz
                        </Link>
                    </div>


                    {decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Teacher' &&
                        <div className='my-4'>
                            <button className='btn btn-success'>
                                <Link className='text-decoration-none text-white' onClick={() => navigate(`/Courses/CourseContent/CourseDetails/CreateQuiz/${SubjectId}`)}>
                                    create Quiz
                                </Link>
                            </button>
                        </div>
                    }


                </section>
            </main>

            : <LoadingPage />}
    </>
}
