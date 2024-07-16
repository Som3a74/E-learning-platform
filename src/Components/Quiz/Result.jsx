import React from 'react'
import { useParams } from 'react-router-dom';
import styles from '../Profile/Profile.module.css'

export default function Result() {

    let { correctAnswers, wrongAnswers } = useParams()
    console.log(correctAnswers)
    console.log(wrongAnswers)
    return <>
        {/* <section className='mt-5 mb-3 pt-5 d-flex justify-content-center align-items-center flex-column' style={{ height: '30vh' }}>
            <h5>correct Answers: {correctAnswers}</h5>
            <h5>wrong Answers  : {wrongAnswers}</h5>
        </section> */}

        <section style={{ flex: .8 }} className={`${styles.ProfileLeft__box} px-3 mt-5 mb-3 pt-5 d-flex justify-content-center align-items-center flex-column`} >
        <div className='my-2'>
            <h4 className='fw-bold mt-4'>correct Answers : </h4>
            <input className="form-control" type="text" value={correctAnswers} aria-label="Disabled input example" disabled readOnly />
        </div>

        <div className='my-2'>
            <h4 className='fw-bold mt-4'>wrong Answers : </h4>
            <input className="form-control" type="text" value={wrongAnswers} aria-label="Disabled input example" disabled readOnly />
        </div>

    </section >
    </>
}
