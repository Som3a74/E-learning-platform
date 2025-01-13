import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadingPage from '../Loading/LoadingPage';
import imgesChimistry from "../../Img/Courses/Chimistry.png";

const CourseCard = ({ course }) => (
  <div style={{ flexGrow: 0.1 }} className="card shadow rounded-3 p-1 col-10 col-sm-5 col-lg-3 col-xl-3">
    <img className="card-img-top w-100" loading="lazy" src={imgesChimistry} alt="Chemistry" />
    <div className="card-body d-flex flex-column justify-content-end">
      <div className="d-flex justify-content-between align-items-baseline">
        <h4 className="card-title fw-semibold">{course.subjectName}</h4>
      </div>
      <p className="fw-bold" style={{ color: "#645e5e" }}>{course.subjectDescription}</p>
      <hr />
      <div className="d-flex justify-content-between align-items-baseline flex-wrap">
        <div className="fw-normal small m-1 mb-2 fw-bolder">
          <i className="fa-regular fa-clock mx-1"></i>{course.period} hr 0 min
        </div>
        <div className="fw-normal small m-1 mb-2 fw-bold">
          <i className="fa-solid fa-people-group mx-1"></i>0
        </div>
        <p className="thirdColor fw-bolder">$ free</p>
      </div>
      <div className="text-center">
        <Link to={`/Courses/${course.subID}`}>
          <button className="btn bgThirdColor rounded-4 px-3 mt-3 mb-1 text-white fw-semibold">Join Course</button>
        </Link>
      </div>
    </div>
  </div>
);

const AvailableCourses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const { userToken } = useSelector((state) => state.ApisliceToken);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_END_POINT_API}/SELP/V1/Subject/List`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setCourses(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchCourses();
    }
  }, [userToken]);

  if (loading) return <LoadingPage />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <main className="p-2 p-md-5 pt-5 mt-5">
      <section className="m-1 p-4 rounded-4 courses-container">
        <div className="my-5 text-center">
          <h1 className="fw-bolder" style={{ color: "#472758" }}>Available Courses</h1>
          <p className="fw-medium" style={{ color: "#797979" }}>
            Discover a variety of courses specifically designed for high school students to enhance your skills and achieve top results.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-5 justify-content-evenly">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default AvailableCourses;