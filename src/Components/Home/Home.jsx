import React, { useEffect } from 'react'
import style from './Home.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import imgesChemistry from "../../Img/Home/Chemistry.png";
import imgesmath from "../../Img/Home/math.png";
import imgesPhysics from "../../Img/Home/Physics.png";
import imgesenglish from "../../Img/Home/english.png";
import imgesarabic from "../../Img/Home/arabic.png";

import teacher1 from "../../Img/Home/teacher1.png";
import teacher2 from "../../Img/Home/teacher2.png";
import teacher3 from "../../Img/Home/teacher3.png";

import imgStudent1 from "../../Img/Home/studentHome1.png";
import imgStudent2 from "../../Img/Home/studentHome2.png";
import imgStudent3 from "../../Img/Home/studentHome3.png";

import experience1 from "../../Img/Home/heartsHome.png";
import experience2 from "../../Img/Home/pazzelHome.png";
import experience3 from "../../Img/Home/BardHome.png";
import { Link } from 'react-router-dom';


export default function Home({ t }) {

  // animation
  useEffect(() => {
    const hiddenElement = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        } else {
          entry.target.classList.remove('show')
        }
      });
    });
    hiddenElement.forEach((el) => observer.observe(el))



    const hiddenFedeOut = document.querySelectorAll('.hidden-fede-out');
    const observerFedeOut = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        } else {
          entry.target.classList.remove('show')
        }
      });
    });
    hiddenFedeOut.forEach((el) => observerFedeOut.observe(el))
  }, [])

  // section Courses
  const Ourcourses = [
    { name: t("Chemistry"), imgcourse: imgesChemistry, time: '16hr 30min', Lessons: '13 Lessons', People: '13 People', avilable: true },
    { name: t("Math"), imgcourse: imgesmath, time: '16hr 30min', Lessons: '13 Lessons', People: '13 People', avilable: false },
    { name: t("Physics"), imgcourse: imgesPhysics, time: '16hr 30min', Lessons: '13 Lessons', People: '13 People', avilable: false },
    { name: t("English"), imgcourse: imgesenglish, time: '16hr 30min', Lessons: '13 Lessons', People: '13 People', avilable: false },
    { name: t("Arabic"), imgcourse: imgesarabic, time: '16hr 30min', Lessons: '13 Lessons', People: '13 People', avilable: false },
  ]

  // Our Teachers
  const OurTeachers = [
    { name: "Matthew E. McNatt", imgTeacher: teacher1, experience: '5 years of experience teaching Chemistry. Currently working at Weston school.', subject: 'Chemistry Teacher', duration: '400ms' },
    { name: "Tracy D. Wright", imgTeacher: teacher2, experience: '10 years of experience teaching English. Currently working at Weston school.', subject: 'English Teacher', duration: '600ms' },
    { name: "Cynthia A. Nelson", imgTeacher: teacher3, experience: '3 years of experience teaching Math. Currently working at VinVi school.', subject: 'Math Teacher', duration: '800ms' },
  ]

  // Students say
  const StudentSay = [
    { name: "Finlay Kirk", imgStudent: imgStudent1, say: t('Learning Physics has never been more fun! , The AI chat feature on this platform adds a creative twist to studying.I highly recommend it!'), job: 'Student' },
    { name: "Dannette P. Cervantes", imgStudent: imgStudent2, say: t(`“Learning Math on this website is a game-changer! It's made studying so much more enjoyable and interactive. I love it very much!”`), job: 'Student' },
    { name: "Clara R. Altman", imgStudent: imgStudent3, say: t(`“Learning Physics has never been more fun! , The AI chat feature on this platform adds a creative twist to studying.I highly recommend it! ”`), job: 'Student' },
  ]

  // Our Teachers
  const LearningExperience = [
    { title: t("Easily Accessible"), imgExperience: experience1, describtion: t('It makes learning chemistry a breeze'), duration: '600ms', widthImg: true },
    { title: t("Fun learning experience"), imgExperience: experience2, describtion: t('It makes learning chemistry a fun and enjoyable experience'), duration: '800ms', widthImg: true },
    { title: t("AI Chat"), imgExperience: experience3, describtion: t('It makes learning more exciting with AI chat'), duration: '1000ms', widthImg: false },
  ]


  // setting of slider
  var settings = {
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    infinite: false,
    // autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1112,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 558,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return <>

    <main>
      <section className={style.hadder}>
        <div className='container'>
          <div className='row align-items-center'>

            <div className='col-md-5 col-12 d-flex flex-column flex-wrap align-items-start justify-content-center'>
              <h1 style={{ transitionDuration: '400ms' }} className='fw-bolder mb-3 hidden'>The <span className='thirdColor'>Smart</span> Choice For <span className='thirdColor'>Future</span></h1>
              <p style={{ transitionDuration: '800ms' }} className='small mb-4 lh-lg text-body-secondary fw-semibold hidden'> {t("Our website is specifically designed for secondary school students, aiming to help them improve their academic performance. Join us and enjoy a fun and beneficial learning experience...")}</p>
              <a style={{ transitionDuration: '1000ms' }} href="#studentSay"><button className='btn btn-danger rounded-4 border-0 bgMain mb-3 hidden'>{t("Learn More")}</button></a>
            </div>

            <div className='col-md-7 col-12'>
              <img className='w-100 hidden' loading='lazy' src={require('../../Img/Home/imgHadder.png')} alt="img of Hadder" />
            </div>

          </div>
        </div>
      </section>

      <section className='mt-5 py-5 vh-100'>
        <div className='container-fluid'>
          <h2 className={style.OurCourse__SpacialHead}>{t("Our Course")}</h2>
          <p className={`${style.OurCourse__headText} hidden`}>{t("Let's excel together Join us for a brighter future.")}</p>
          <div className='mt-5'>

            <Slider {...settings}>
              {Ourcourses.map((course, index) =>
                <div key={index} className={`${!course.avilable && style.disableCard} card shadow border-1 rounded-3 p-2 hidden-fede-out`}>
                  <img className='card-img-top w-100' src={course.imgcourse} alt={course.name} />
                  <div className="card-body">
                    <div className='d-flex justify-content-between align-items-baseline'>
                      <h4 className="card-title fw-semibold">{course.name}</h4>
                      <div>
                        <span className="fa fa-star thirdColor"></span>
                        <span className="fa fa-star thirdColor"></span>
                        <span className="fa fa-star thirdColor"></span>
                        <span className="fa fa-star thirdColor"></span>
                        <span className="fa fa-star text-secondary"></span>
                      </div>
                    </div>
                    <p className='thirdColor fw-bold'>$ {t('free')}</p>
                    <hr />
                    <div className='d-flex justify-content-between align-items-baseline flex-wrap'>
                      <div className='fw-normal small m-1 mb-2'><i className="fa-regular fa-clock"></i>{course.time}</div>
                      <div className='fw-normal small m-1 mb-2'><i className="fa-solid fa-video"></i>{course.Lessons}</div>
                      <div className='fw-normal small m-1 mb-2'><i className="fa-solid fa-people-group"></i>{course.People}</div>
                    </div>
                    <div className='text-center'>
                      <Link to="/Courses" ><button className="btn  bgThirdColor rounded-4 px-3 mt-3 mb-1 text-white fw-semibold">Join Course</button></Link>
                    </div>
                  </div>
                </div>
              )}
            </Slider>

          </div>
        </div>
      </section>


      <section id='studentSay' className={`${style.hadder}`}>
        <div className='container'>
          <div className='row align-items-center justify-content-lg-between justify-content-md-center'>

            <div className={`${style.displaysm} col-md-4 col-12`}>
              <img className='w-100 hidden' loading='lazy' src={require('../../Img/Home/OBJECTS.png')} alt="img OBJECTS" />
            </div>

            <div className='col-lg-6 col-md-9 col-12'>
              <h1 style={{ transitionDuration: '400ms' }} className='fw-bolder mb-5 hidden'>Free <span className='thirdColor'> Learning </span> Experience</h1>

              {LearningExperience.map((experience, index) =>
                <div key={index} style={{ transitionDuration: experience.duration }} className='d-flex mb-4 hidden'>
                  <div className='secondbackground p-1 me-2 rounded-3 d-flex justify-content-center align-items-center'>
                    <img className={experience.widthImg ? 'w-75' : ''} style={{ width: '60px' }} loading='lazy' src={experience.imgExperience} alt="img Easily Accessible" />
                  </div>
                  <div>
                    <h6 className='fw-semibold'>{experience.title}</h6>
                    <p className='small text-secondary fw-medium'>{experience.describtion}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>


      <section className='mt-5 vh-100'>
        <div className='container'>
          <h2 className={`${style.OurCourse__SpacialHead}`}>{t("Students say")}</h2>
          <p className={`${style.OurCourse__headText} hidden`}>{t('Thanks for being part of our community!')}</p>
          <div className='row justify-content-center mt-5'>

            {StudentSay.map((student, index) =>
              <div key={index} className='card col-lg-4 col-md-5 col-10 shadow border-1 rounded-3 p-3 mb-3 mx-3 hidden-fede-out'>
                <p className='small fw-medium text-secondary'>{student.say}</p>
                <div className='d-flex align-items-center'>
                  <img loading='lazy' src={student.imgStudent} alt="img of student Finlay Kirk" />
                  <div className='ms-2'>
                    <h6 className='fw-bold m-0'>{student.name}</h6>
                    <p className='small fw-medium text-secondary m-0'>{student.job}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>


      <section className='py-5' style={{ backgroundColor: '#FDF8EE' }}>
        <div className='container'>
          <h2 className={style.OurCourse__SpacialHead}>Our Teachers</h2>
          <p className={`${style.OurCourse__headText} hidden`}>{t("Our teachers are amazing! They inspire the students to learn and support them every step of the way.")}</p>
          <div className={`${style.Our_Teachers} mt-5`}>

            {OurTeachers.map((teacher, index) =>
              <div key={index} style={{ transitionDuration: teacher.duration }} className="card  shadow border-1 rounded-3 p-2 mb-3 mx-3 hidden-fede-out">
                <img loading='lazy' src={teacher.imgTeacher} alt="Matthew E. McNatt" />
                <div className="card-body">
                  <h5 className="fw-bold mb-2">{teacher.name}</h5>
                  <p className="small fw-medium text-secondary mb-1">{teacher.experience}</p>
                  <h6 className="fw-semibold thirdColor">{teacher.subject}</h6>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </main>
  </>
}