import { useRef } from "react";
import ResetPassword1 from "../../Img/ResetPassword/ResetPassword1.png";
import style from '../Quiz/Quiz.module.css'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmResetPass() {
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(null)
    const mail = useRef('')
    const code = useRef('')
    const navigate = useNavigate();


    const validateEmail = (email) => {
        const regEx = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(?:\.[a-z]{2,8})?$/;
        if (!email) {
            setError('Email is required');
            return false;
        }
        if (!regEx.test(email)) {
            setError('Email is not valid');
            return false;
        }
        return true;
    };

    async function updatePost(email, code) {
        setLoading(true);

        if (!code) {
            setError('code is required');
            setLoading(false)
            return false;
        }

        if (!validateEmail(email)) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_END_POINT_API}/SELP/V1/User/ConfirmResetPass?ResetCode=${code}&Email=${email}`)
            if (data.message === 'Added Successfully') {
                navigate('/ChangePassword')
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
        <main className="py-3 pt-5 " style={{ height: '70vh', backgroundColor: '#eef2f52b' }}>
            <section className='d-flex justify-content-center align-items-center mx-sm-3 mx-3 mt-5 flex-wrap'>


                <div className="col-10 col-lg-4">

                    <h2 className='fw-semibold mb-4'>Verify your email<br /> address</h2>

                    <div className="alert alert-warning">
                        <strong>!</strong> we send code in email
                    </div>

                    <input ref={code} name='code' type="text" className="form-control mb-4" id="code" placeholder="&#xf023; &nbsp; &nbsp; code" />
                    <input ref={mail} name='Email' type="email" className="form-control" id="Email" placeholder="&#xf0e0; &nbsp; Email" />
                    <button disabled={Loading} onClick={() => updatePost(mail.current.value, code.current.value)} type="submit" className="btn bgMain w-100 my-3 text-white fw-semibold">Submit</button>
                    {Error !== null ? <div className='alert alert-danger fw-medium text-center'>{Error}</div> : null}
                </div>
                <div className={`${style.displaysm} mt-4`}>
                    <img className="ms-4 mt-5" style={{ width: '300px' }} src={ResetPassword1} alt="" />
                </div>
            </section>
        </main>
    )
}
