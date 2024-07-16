import React from 'react'
import style from './Profile.module.css'
import LoadingPage from './../Loading/LoadingPage';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProfileTeacher() {
    const { decodeToken } = useSelector((state) => state.ApisliceToken);
    console.log(decodeToken)

    if (!decodeToken) {
        return <LoadingPage />
    }

    return (
        <section style={{ flex: .8 }} className={`${style.ProfileLeft__box} col-lg-4 col-sm-12 px-3 d-flex flex-column justify-content-evenly`} >
            <div className='my-3'>
                <h4 className='fw-bold mt-4'>First Name : </h4>
                <input className="form-control" type="text" value={decodeToken.FirstName} aria-label="Disabled input example" disabled readOnly />
            </div>
            <div className='my-3'>
                <h4 className='fw-bold mt-4'>Last Name : </h4>
                <input className="form-control" type="text" value={decodeToken.LastName} aria-label="Disabled input example" disabled readOnly />
            </div>
            <div className='my-3'>
                <h4 className='fw-bold mt-4'>Email : </h4>
                <input className="form-control" type="text" value={decodeToken.Email} aria-label="Disabled input example" disabled readOnly />
            </div>
            <div className='my-3'>
                <h4 className='fw-bold mt-4'>Phone Number : </h4>
                <input className="form-control" type="text" value={decodeToken.PhoneNumber} aria-label="Disabled input example" disabled readOnly />
            </div>

            <div className='my-3 text-center'>
                <button style={{ width: '250px' }} className="btn bgMain my-3  text-white fw-semibold">
                    <Link className="fw-semibold text-decoration-none text-white " aria-current="page" to="/CreateSubject" >
                        Create Subject
                    </Link>
                </button>

            </div>

        </section>
    )
}
