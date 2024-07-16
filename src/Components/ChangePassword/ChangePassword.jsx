import { useRef } from "react";
import ResetPassword1 from "../../Img/ResetPassword/ResetPassword1.png";
import style from '../Quiz/Quiz.module.css'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function ChangePassword() {
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(null)
    const mail = useRef('')
    const Password = useRef('')
    const ConfirmPassword = useRef('')
    const navigate = useNavigate();


    const validateEmail = () => {
        const regEx = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(?:\.[a-z]{2,8})?$/;
        if (!mail.current.value) {
            setError('Email is required');
            return false;
        }
        if (!regEx.test(mail.current.value)) {
            setError('Email is not valid');
            return false;
        }
        if (!Password.current.value) {
            setError('Password is required');
            return false;
        }

        if (!ConfirmPassword.current.value) {
            setError('Confirm Password is required');
            return false;
        }

        if (ConfirmPassword.current.value !== Password.current.value) {
            setError('ConfirmPassword must equal Password');
            return false;
        }

        return true;
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validateEmail()) {
            setLoading(false);
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = [...formData.entries()]
        data.forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const { data } = await axios.post(`https://selpapi20240618171141.azurewebsites.net/SELP/V1/User/ChangePassword`, formData)
            
            if (data.message === 'Added Successfully') {
                toast.success('Added Successfully', {
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
                    navigate('/')
                }, 2500);
            }

        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }

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

        <main className="py-3 pt-5 " style={{ height: '80vh', backgroundColor: '#eef2f52b' }}>
            <section className='d-flex justify-content-center align-items-center mx-sm-3 mx-3 mt-5 flex-wrap'>
                <form className="col-10 col-lg-4" onSubmit={handelSubmit}>
                    <h2 className='fw-semibold mb-5'>Change your<br /> Password</h2>
                    <input ref={mail} name='Email' type="email" className="form-control mb-4" id="Email" placeholder="&#xf0e0; &nbsp; Email" />
                    <input ref={Password} name='Password' type="text" className="form-control mb-4" id="Password" placeholder="&#xf023; &nbsp; &nbsp; password" />
                    <input ref={ConfirmPassword} name='ConfirmPassword' type="text" className="form-control mb-4" id="ConfirmPassword" placeholder="&#xf023; &nbsp; &nbsp; Confirm Password" />
                    <button disabled={Loading} type="submit" className="btn bgMain w-100 my-3 mb-4 text-white fw-semibold">Submit</button>
                    {Error !== null ? <div className='alert alert-danger fw-medium text-center'>{Error}</div> : null}
                </form>
                <div className={`${style.displaysm} mt-4`}>
                    <img className="ms-4 mt-5" style={{ width: '300px' }} src={ResetPassword1} alt="" />
                </div>
            </section>
        </main>
    </>
}