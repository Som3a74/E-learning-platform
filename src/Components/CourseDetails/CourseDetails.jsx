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

    console.log(process.env.REACT_APP_END_POINT_API)
    const { userToken } = useSelector((state) => state.ApisliceToken);
    const getCourse = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_END_POINT_API}/Content/SELP/V1/Content/${SubjectId}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    const handleDownload = () => {
        const pdfUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(DataCourse.pdf)}`;

        fetch(pdfUrl, { mode: 'cors' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch the file. Status: ${response.status}`);
                }
                return response.blob();
            })
            .then((blob) => {
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.download = "Material.pdf";
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(downloadUrl);
            })
            .catch((error) => {
                console.error("Error downloading the file:", error.message || error);
            });
    };




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
                        {/* <a className="text-decoration-none text-black" href={DataCourse.pdf} target="_blank" download="document.pdf">
                            <i className="fa-solid fa-book mx-2"></i>pdf
                        </a> */}

                        <div className="parent d-flex w-100 justify-content-center " style={{height:'460px'}} dir="RTL">
                            <iframe title='doc' className="w-50 h-100"
                                src={DataCourse.pdf}>
                            </iframe>
                        </div>

                        {/* <a
                            href="https://localhost:7196/Contents/Material/6a93ec3027c44853a6d4770ee63f31c5.pdf"
                            //https://localhost:7196/Contents/Material/6a93ec3027c44853a6d4770ee63f31c5.pdf
                            download="document.pdf"
                            className="download-button"
                        >
                            Download PDF
                        </a> */}

                        {/* <a href="https://s251d4.downet.net/download/1736730777/67831719323ee/Abo Nasab.2023.720P.WEB-DL.AKWAM.mp4"
                            download="document.pdf"
                        >
                            تحميل
                        </a> */}


                        <button
                            onClick={handleDownload}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Download PDF
                        </button>


                        {/* <div style={{ margin: "20px", textAlign: "center" }}>
                            <h2>عرض ملف PDF</h2>
                            <iframe
                                src={DataCourse.pdf}
                                title="PDF Viewer"
                                width="100%"
                                height="600px"
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                                allow="fullscreen"
                            ></iframe>
                            <button
                                style={{
                                    marginTop: "20px",
                                    padding: "10px 20px",
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    const link = document.createElement("a");
                                    link.href = DataCourse.pdf;
                                    link.download = "Material.pdf";
                                    link.click();
                                }}
                            >
                                تحميل الملف
                            </button>
                        </div> */}
                    </div>

                    <div className='my-4'>
                        <Link className='text-decoration-none text-black' onClick={() => navigate(`/Quiz/${SubjectId}`, { replace: true })}>
                            <img className='mx-2' src={require("../../Img/course-content/quiz icon.png")} alt="" />
                            quiz
                        </Link>
                    </div>


                    {decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Teacher' || 'admin' ?
                        <div className='my-4'>
                            <button className='btn btn-success'>
                                <Link className='text-decoration-none text-white' onClick={() => navigate(`/Courses/CourseContent/CourseDetails/CreateQuiz/${SubjectId}`)}>
                                    create Quiz
                                </Link>
                            </button>
                        </div> : null
                    }


                </section>
            </main>

            : <LoadingPage />}
    </>
}
