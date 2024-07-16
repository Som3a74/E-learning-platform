import { useEffect, useState } from 'react'
import style from './Profile.module.css'
import { useSelector } from 'react-redux';

export default function ProfileLeft() {
  const { userName } = useSelector((state) => state.ApisliceToken);

  const subjectProgress = [
    { name: "English", ProgressStart: 0, Progress: 50, color: '#7d2ae8' },
    { name: "Math", ProgressStart: 0, Progress: 70, color: '#FC8E8E' },
    { name: "Chemistry", ProgressStart: 0, Progress: 30, color: '#39B5A6' },
  ]

  const Activites = [
    { name: "English", color: '#AEEDE2' },
    { name: "Math", color: '#FFC48E' },
  ]

  // const [countPrograss, setcountPrograss] = useState(0)

  // function fn_counting() {

  //   subjectProgress.forEach((counter) => {

  //     function fn_updateCount() {

  //       if (counter.ProgressStart+1 <= counter.Progress) {
  //         counter.ProgressStart++
  //         setcountPrograss(counter.ProgressStart)
  //         setTimeout(fn_updateCount, 30)
  //         console.log(counter.ProgressStart)
  //       } else {
  //         console.log('done');
  //       }

  //     }
  //     fn_updateCount()
  //   })
  // }

  // useEffect(() => {
  //   fn_counting()
  // }, [])

  return (
    <section style={{ flex: .95 }} className={`${style.ProfileLeft__box} col-lg-4 col-sm-12 px-3 d-flex flex-column justify-content-evenly`} >

      <div className='text-center my-3 '>
        {/* <img className={`${style.profile__img} bgMain`} src={require('../../Img/Profile/profill img.jpg')} alt="profile img" /> */}
        <h4 className='fw-bold mt-4'>Student : {userName}</h4>
      </div>

      <div className='d-flex justify-content-sm-between justify-content-center my-4 flex-wrap'>

        {subjectProgress.map((subject, index) =>
          <div key={index} className='text-center m-2'>
            <div className={style.ProfileLeft_circular_progress} style={{ background: `conic-gradient(${subject.color} ${subject.Progress}%, #ededed 5deg)` }}>
              <p style={{ backgroundColor: subject.color, padding: '13px 10px', borderRadius: '50%' }} className={style.ProfileLeft_progress_value}>{subject.Progress}%</p>
            </div>
            <h5 className='fw-bolder fs-6 mt-4 text-body-secondary'>{subject.name}</h5>
          </div>
        )}

      </div>

      <div>
        <h3 className='mb-4'>Last Activites</h3>

        {Activites.map((activite, index) =>
          <div key={index} className='d-flex align-items-stretch justify-content-center justify-content-sm-start flex-wrap  p-3 border border-3 rounded-3 my-2'>
            <span style={{ backgroundColor: activite.color }} className={`${style.ProfileLeft_Activites} mb-2 mb-sm-0`}><i className="fa-solid fa-check fa-2xl"></i></span>
            <div className='ms-3'>
              <h5 className='text-body-secondary fw-medium'>Your Application has <span className='text-dark fw-medium'>accept</span></h5>
              <p className='text-dark fs-5 fw-medium'>3 Companies</p>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
