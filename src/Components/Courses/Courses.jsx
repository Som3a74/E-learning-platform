import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Courses.module.css";
import axios from "axios";
import LoadingPage from './../Loading/LoadingPage';
import { useSelector } from "react-redux";

function Courses() {
  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(null)
  const [DataCourse, setDataCourse] = useState(null)
  let { SubjectId } = useParams()
  console.log(SubjectId)

  const { userToken } = useSelector((state) => state.ApisliceToken);

  const getCourse = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`https://selpapi20240618171141.azurewebsites.net/SELP/V1/Subject/List`,
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );
      console.log(data)
      setDataCourse(data.data[0]);
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
  }, [userToken])




  return <>
    {!Loading && DataCourse ?
      <div className={style.containrBody}>
        <div className={style.parentContainer}>
          <section
            className={`${style.detailsCourse} ${style.gridMan} ${style.grid2Cols} ${style.gridCenterV}`}
          >
            <div className={style.courseImgBox}>
              {/* <img
                className={style.courseImg}
                src={require("../images/Image.png")}
                alt=""
              /> */}
              <div className={style.courseImg}>
                <video className="w-100" controls src="https://selpapi20240618171141.azurewebsites.net/Contents/videos/12ecff8f99bf448cbc4ec8ee92d6ca7c.mp4"></video>
              </div>
            </div>
            <div className={style.courseTextBox}>
              <h2 className={style.headingPrimary}>{DataCourse.subjectName}</h2>
              <p className={style.lessonNumber}>
                Number of lessons: <strong>49 Lesson</strong>
                <strong className={style.viewDetails}>
                  View detail
                  <i
                    className={`fa-solid fa-chevron-down ${style.arrowDown}`}
                  ></i>
                </strong>
              </p>
              <p>
                Completion time: <strong>1 Month</strong>
              </p>
              <p>
                Teacher:
                <strong className={style.teacherName}>Kritsin Watson</strong>
              </p>
              <p>
                Students have learned: <strong>12,000+</strong>
              </p>
              <p className={style.rating}>
                Review:
                <i className={`fa-solid fa-star ${style.starIcon}`}></i>
                <i className={`fa-solid fa-star ${style.starIcon}`}></i>
                <i className={`fa-solid fa-star ${style.starIcon}`}></i>
                <i className={`fa-solid fa-star ${style.starIcon}`}></i>
                <i className={`fa-solid fa-star ${style.starIcon}`}></i>
              </p>
              <p>
                Price: <strong>free</strong>
              </p>
              <Link className={style.btnMan} to={`/Courses/CourseContent/${SubjectId}`}>
                start course
              </Link>
            </div>
          </section>
          <section className={style.courseDescription}>
            <div className={style.courseDescriptionBox}>
              <h3 className={style.headingTertiary}>Course Details</h3>
              <p>
                {DataCourse.subjectDescription}
              </p>
              <h3 className={style.headingTertiary}>Who this course is for</h3>
              <p>
                This course is for high school students who are interested in
                understanding the fundamental principles of chemistry and how it
                applies to the world around us. It's perfect for those who enjoy
                scientific inquiry a nd want to explore the fascinating realm of
                atoms and molecules.
              </p>
              <h3 className={style.headingTertiary}>
                What you'll learn in this course:
              </h3>
              <ul className={style.courseProperties}>
                <li>
                  <i
                    className={`fa-solid fa-circle-check ${style.checkboxIcon}`}
                  ></i>
                  The basic principles of chemistry and the properties of
                  matter.
                </li>
                <li>
                  <i
                    className={`fa-solid fa-circle-check ${style.checkboxIcon}`}
                  ></i>
                  How to balance chemical equations and understand chemical
                  reactions.
                </li>
                <li>
                  <i
                    className={`fa-solid fa-circle-check ${style.checkboxIcon}`}
                  ></i>
                  The structure of atoms, elements, and the periodic table.
                </li>
                <li>
                  <i
                    className={`fa-solid fa-circle-check ${style.checkboxIcon}`}
                  ></i>
                  How to calculate molar mass and perform stoichiometric
                  calculations.
                </li>
              </ul>
            </div>
          </section>
        </div>



        <div className={style.similar}>
          <h2 className={style.headingTertiary}>Similar Courses</h2>
          <p className={style.more}>see more &gt;</p>
        </div>

        <div>
          <div className={style.similarCards}>
            <div className={style.similarCard}>
              <div>
                <img src={require("../../Img/Courses/Rectangle 2750.png")} alt="" />
              </div>
              <div>
                <h4 className={style.cardTitle}>Physics Basic - Course</h4>
                <p className={style.cardDescription}>
                  Physics Masterclass, you will learn with Sarah Johnson - Head
                  of Product Customer Platform Gojek Indonesia.
                </p>
                <p className={style.freeOffer}>$ free</p>
              </div>
            </div>
            <div className={style.similarCard}>
              <div>
                <img src={require("../../Img/Courses/Rectangle 2751.png")} alt="" />
              </div>
              <div>
                <h4 className={style.cardTitle}>Math Basic - Course</h4>
                <p className={style.cardDescription}>
                  Math Masterclass, you will learn with Sarah Johnson - Head of
                  Product Customer Platform Gojek Indonesia.
                </p>
                <p className={style.freeOffer}>$ free</p>
              </div>
            </div>
            <div className={style.similarCard}>
              <div>
                <img src={require("../../Img/Courses/Rectangle 2752.png")} alt="" />
              </div>
              <div>
                <h4 className={style.cardTitle}>Arabic Basic - Course</h4>
                <p className={style.cardDescription}>
                  Product Management Masterclass, you will learn with Sarah
                  Johnson - Head of Product Customer Platform Gojek Indonesia.
                </p>
                <p className={style.freeOffer}>$ free</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      : <LoadingPage />}
  </>
}

export default Courses;
