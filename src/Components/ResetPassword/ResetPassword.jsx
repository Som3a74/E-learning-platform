import { useRef } from "react";
import ResetPassword1 from "../../Img/ResetPassword/ResetPassword1.png";
import style from '../Quiz/Quiz.module.css'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(null)
    const mail = useRef('')
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regEx = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(?:\.[a-z]{2,8})?$/;
        if (!email) {
            console.log('Email is required');
            setError('Email is required');
            return false;
        }
        if (!regEx.test(email)) {
            console.log('Email is not valid');
            setError('Email is not valid');
            return false;
        }
        return true;
    };

    async function updatePost(email) {
        setLoading(true);

        if (!validateEmail(email)) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get(`https://selpapi20240618171141.azurewebsites.net/SELP/V1/User/SendResetPassword?Email=${email}`)
            if (data.message === 'Added Successfully') {
                navigate('/ConfirmResetPass')
            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="py-3 pt-5 " style={{ height: '60vh', backgroundColor: '#eef2f52b' }}>
            <section className='d-flex justify-content-center align-items-center mx-sm-3 mx-3 mt-5 flex-wrap'>
                <div className="col-10 col-lg-4">
                    <h2 className='fw-semibold mb-5'>FORGOT<br /> PASSWORD</h2>
                    <input ref={mail} name='Email' type="email" required className="form-control" id="Email" placeholder="&#xf0e0; &nbsp; Email" />
                    <button disabled={Loading} onClick={() => updatePost(mail.current.value)} type="submit" className="btn bgMain w-100 my-3 text-white fw-semibold">Submit</button>
                    {Error !== null ? <div className='alert alert-danger fw-medium text-center'>{Error}</div> : null}
                </div>
                <div className={`${style.displaysm} mt-4`}>
                    <img className="ms-4 mt-5" style={{ width: '300px' }} src={ResetPassword1} alt="" />
                </div>
            </section>
        </main>
    )
}
