import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getCreateContent } from '../../Redux/SliceCreateContent';
import { ToastContainer, toast } from 'react-toastify';
import LoadingPage from '../Loading/LoadingPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateContent() {
    const { data_CreateContent, loading_CreateContent, errors_CreateContent } = useSelector((state) => state.ApiSliceCreateContent);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const forms = document.querySelector('form');
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);
    const [ListSubject, setListSubject] = useState(null);
    const { userToken } = useSelector((state) => state.ApisliceToken);

    const validate = Yup.object({
        Name: Yup.string().required('The Name field is required.'),
        description: Yup.string().required('The description field is required.'),
        video: Yup.string().required('The video field is required.'),
        pdf: Yup.string().required('The PDF field is required.'),
        subjectID: Yup.string().required('The subject field is required.'),
    });

    function handleSubmit(values) {
        const formData = new FormData(forms);
        const data = [...formData.entries()];

        // const subjectIDIndex = data.findIndex(item => item[0] === 'subjectID');
        // if (subjectIDIndex !== -1) {
        //     data[subjectIDIndex][1] = '21'; 
        // }

        dispatch(getCreateContent(data)).then((response) => {

            if (response?.payload?.statusCode === 201) {
                toast.success('Created Content Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate('/');
                }, 2500);
            }
        });
    }

    const formik = useFormik({
        initialValues: {
            Name: '',
            description: '',
            video: '',
            pdf: '',
            subjectID: '',
        },
        validationSchema: validate,
        onSubmit: handleSubmit,
    });

    const getSubject = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_END_POINT_API}/SELP/V1/Subject/List`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            console.log(data)
            setListSubject(data.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userToken) {
            getSubject();
        }
    }, [userToken]);

    return (
        <>
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

            {!Loading && ListSubject ?
                <main className='p-2 p-md-5 pt-5 mt-5'>
                    <section className='m-1 m-md-5 p-4 rounded-4' style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 7px 20px rgba(0, 0, 0, 0.25)", border: '1px solid rgba(29, 29, 29, 0.1)' }}>
                        <div className='my-5 text-center'>
                            <h1 className='fw-bolder' style={{ color: "#472758" }}>Create new content</h1>
                        </div>

                        <form onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label htmlFor="Name" className="form-label fw-medium">Content Name</label>
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Name}
                                    name='Name'
                                    type="text"
                                    className="form-control border-3"
                                    id="Name"
                                    placeholder="Enter Content Name"
                                />
                                {formik.errors.Name && formik.touched.Name ? (
                                    <div className='alert alert-danger'>{formik.errors.Name}</div>
                                ) : null}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="description" className="form-label fw-medium">Content description</label>
                                <textarea
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                    style={{ resize: 'none' }}
                                    className="form-control border-3"
                                    name='description'
                                    id="description"
                                    rows="3"
                                    placeholder="Enter Content Description"
                                />
                                {formik.errors.description && formik.touched.description ? (
                                    <div className='alert alert-danger'>{formik.errors.description}</div>
                                ) : null}
                            </div>

                            <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap">
                                <div style={{ width: "40%" }} className='mt-4'>
                                    <h4>Content Video</h4>
                                    <label htmlFor="video" className="form-label">Upload your video</label>
                                    <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.video}
                                        className="form-control border-3"
                                        type="file"
                                        name='video'
                                        id="video"
                                    />
                                    {formik.errors.video && formik.touched.video ? (
                                        <div className='alert alert-danger'>{formik.errors.video}</div>
                                    ) : null}
                                </div>
                                <div style={{ width: "40%" }} className='mt-4'>
                                    <h4>Content PDF</h4>
                                    <label htmlFor="pdf" className="form-label">Upload your PDF</label>
                                    <input
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.pdf}
                                        className="form-control border-3"
                                        type="file"
                                        name='pdf'
                                        id="pdf"
                                    />
                                    {formik.errors.pdf && formik.touched.pdf ? (
                                        <div className='alert alert-danger'>{formik.errors.pdf}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="my-5 p-5 ps-0">
                                <h4 className='mb-4'>Subject Category</h4>
                                <select
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.subjectID}
                                    name='subjectID'
                                    id='subjectID'
                                    className="form-select w-75 border-3"
                                >
                                    {ListSubject.map((course, index) =>
                                        <option value={index + 1} key={index}>{course.subjectName}</option>
                                    )}
                                </select>
                                {formik.errors.subjectID && formik.touched.subjectID ? (
                                    <div className='alert alert-danger'>{formik.errors.subjectID}</div>
                                ) : null}
                            </div>

                            {loading_CreateContent ?
                                <button disabled className='btn bgMain w-100 my-3 text-white fw-semibold'>
                                    <i className='fa fa-spinner fa-spin'></i>
                                </button>
                                :
                                <button
                                    disabled={!(formik.isValid && formik.dirty)}
                                    type="submit"
                                    className="btn bgMain w-100 my-3 text-white fw-semibold"
                                >
                                    Create content
                                </button>
                            }

                            {errors_CreateContent != null ?
                                <div className='alert alert-danger fw-medium text-center'>{errors_CreateContent}</div>
                                : null}

                        </form>
                    </section>
                </main>
                :
                <LoadingPage />
            }
        </>
    );
}
