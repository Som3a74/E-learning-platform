import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Courses.module.css";
import axios from "axios";
import LoadingPage from "./../Loading/LoadingPage";
import { useSelector } from "react-redux";

function Courses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const { SubjectId } = useParams();

  const { userToken } = useSelector((state) => state.ApisliceToken);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_END_POINT_API}/SELP/V1/Subject/${SubjectId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      // console.log(response.data.data)
      setCourseData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) fetchCourseData();
  }, [userToken]);

  if (loading) return <LoadingPage />;

  if (error) return <div className={style.error}>{error}</div>;

  if (!courseData) return null;

  return (
    <div className={style.containrBody}>
      <div className={style.parentContainer}>
        <section className={`${style.detailsCourse} ${style.gridMan} ${style.grid2Cols} ${style.gridCenterV}`}>
          <div className={style.courseImgBox}>
            <div className={style.courseImg}>
              <iframe
                height="315"
                className="w-100"
                src="https://www.youtube.com/embed/oRqITfJMcSI?si=jA8THhGbwCc1QD6z"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className={style.courseTextBox}>
            <h2 className={style.headingPrimary}>{courseData.subjectName}</h2>
            <p className={style.lessonNumber}>
              Number of lessons: <strong>49 Lesson</strong>
              <strong className={style.viewDetails}>
                View detail
                <i className={`fa-solid fa-chevron-down ${style.arrowDown}`}></i>
              </strong>
            </p>
            <p>
              Completion time: <strong>1 Month</strong>
            </p>
            <p>
              Teacher: <strong className={style.teacherName}>Kritsin Watson</strong>
            </p>
            <p>
              Students have learned: <strong>12,000+</strong>
            </p>
            <p className={style.rating}>
              Review:
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star ${style.starIcon}`}></i>
              ))}
            </p>
            <p>
              Price: <strong>free</strong>
            </p>
            <Link className={style.btnMan} to={`/Courses/CourseContent/${SubjectId}`}>
              Start Course
            </Link>
          </div>
        </section>
        <section className={style.courseDescription}>
          <div className={style.courseDescriptionBox}>
            <h3 className={style.headingTertiary}>Course Details</h3>
            <p>{courseData.subjectDescription}</p>
            <h3 className={style.headingTertiary}>Who this course is for</h3>
            <p>
              This course is for high school students who are interested in
              understanding the fundamental principles of chemistry and how it
              applies to the world around us. It's perfect for those who enjoy
              scientific inquiry and want to explore the fascinating realm of
              atoms and molecules.
            </p>
            <h3 className={style.headingTertiary}>What you'll learn in this course:</h3>
            <ul className={style.courseProperties}>
              {[
                "The basic principles of chemistry and the properties of matter.",
                "How to balance chemical equations and understand chemical reactions.",
                "The structure of atoms, elements, and the periodic table.",
                "How to calculate molar mass and perform stoichiometric calculations.",
              ].map((item, index) => (
                <li key={index}>
                  <i className={`fa-solid fa-circle-check ${style.checkboxIcon}`}></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className={style.similar}>
        <h2 className={style.headingTertiary}>Similar Courses</h2>
        <p className={style.more}>See more &gt;</p>
      </div>

      <div className={style.similarCards}>
        {["Physics", "Math", "Arabic"].map((course, index) => (
          <div key={index} className={style.similarCard}>
            <div>
              <img
                src={require(`../../Img/Courses/Rectangle 275${index}.png`)}
                alt=""
              />
            </div>
            <div>
              <h4 className={style.cardTitle}>{`${course} Basic - Course`}</h4>
              <p className={style.cardDescription}>
                {`${course} Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.`}
              </p>
              <p className={style.freeOffer}>$ free</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;