import { useEffect, useState } from "react";
import style from "./CourseContent.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../Loading/LoadingPage";
import axios from "axios";

function CourseContent() {
  const [likes, setLikes] = useState(100);
  const [dislikes, setDislikes] = useState(4);
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);
  const [chevronVisible, setChevronVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(
    `${process.env.REACT_APP_END_POINT_API}/Contents/videos/12ecff8f99bf448cbc4ec8ee92d6ca7c.mp4`
  );

  const navigate = useNavigate();
  const { SubjectId } = useParams();
  const { userToken } = useSelector((state) => state.ApisliceToken);

  const getCourse = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_END_POINT_API}/Content/GetContentForEachSubject?Id=${SubjectId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setCourseData(data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      setError(errorMessage);
      if (err.response?.data?.statusCode === 404) {
        setCourseData("please add courses first");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, [userToken]);

  const handleLike = () => {
    setLikes((prev) => (likeActive ? prev - 1 : prev + 1));
    setLikeActive(!likeActive);
    if (dislikeActive) {
      setDislikes((prev) => prev - 1);
      setDislikeActive(false);
    }
  };

  const handleDislike = () => {
    setDislikes((prev) => (dislikeActive ? prev - 1 : prev + 1));
    setDislikeActive(!dislikeActive);
    if (likeActive) {
      setLikes((prev) => prev - 1);
      setLikeActive(false);
    }
  };

  return (
    <>
      {!loading && courseData ? (
        <div className={style.courseBody}>
          <div className={style.courseContent}>
            <div className={`${style.subjectContainer} ${style.gridMan} ${style.grid2Cols}`}>
              <section className={`${style.courseContent} ${style.videoContainer}`}>
                <div className={style.lessonBox}>
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

                  <div className={style.likeDislike}>
                    <div className={style.teacherInfo}>
                      <img
                        src={require("../../Img/course-content/Ellipse 1.jpg")}
                        alt="Teacher"
                      />
                      <p>TeacherName</p>
                    </div>
                    <div className={style.like}>
                      <button className={style.parentLikeBtn} onClick={handleLike}>
                        <i
                          className={`fa-regular fa-thumbs-up ${style.likeIconBtn} ${likeActive ? style.activeLike : ""}`}
                        ></i>
                        {likes}
                      </button>
                      <button className={style.parentLikeBtn} onClick={handleDislike}>
                        <i
                          className={`fa-regular fa-thumbs-down ${style.likeIconBtn} ${style.dislikeIcon} ${
                            dislikeActive ? style.activeDislike : ""
                          }`}
                        ></i>
                        &nbsp;{dislikes}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div className={`${style.courseBox} ${style.courseContainer}`}>
                <div className={style.backContainer}>
                  <i
                    className={`fa-solid fa-circle-chevron-left ${style.backIcon}`}
                  ></i>
                  <p className={style.backText}>Back</p>
                </div>
                <div className={style.rowTitle}>
                  <p className={style.chapterTitle}>Chapter 1</p>
                  <i
                    onClick={() => setChevronVisible(!chevronVisible)}
                    className={`fa-solid fa-chevron-down ${style.arrowDownContent}`}
                  ></i>
                </div>

                {courseData !== "please add courses first" ? (
                  <ul
                    style={{ display: chevronVisible ? "block" : "none" }}
                    className={style.chapterList}
                  >
                    {courseData.map((item) => (
                      <li key={item.contentID} className={style.rowChapter}>
                        <Link
                          onClick={() =>
                            navigate(`/Courses/CourseContent/CourseDetails/${item.contentID}`)}
                          className="cursorPointer mb-3 text-decoration-none text-black fw-bold mt-3"
                        >
                          <img
                            className={style.playCricle}
                            src={require("../../Img/course-content/play-cricle.png")}
                            alt="Play"
                          />
                          {item?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>Not courses Available</div>
                )}
              </div>
            </div>

            <div className={`${style.feedbackForm} ${style.subjectContainer}`}>
              <div className={style.commentBox}>
                <h2 className={style.headingTertiary}>Comment</h2>
                <form className={style.commentBoxChild}>
                  <div className={style.teacherInfo}>
                    <img
                      src={require("../../Img/course-content/Ellipse 1.jpg")}
                      alt="User"
                    />
                    <p>John Doe</p>
                  </div>
                  <input type="text" defaultValue="" />
                  <div className={style.commentOperation}>
                    <div className={style.commentIcons}>
                      <i className={`fa-solid fa-bold ${style.commentIcon}`}></i>
                      <i className={`fa-solid fa-italic ${style.commentIcon}`}></i>
                      <i className={`fa-solid fa-link ${style.commentIcon}`}></i>
                    </div>
                    <button className={style.commentSubmit}>Comment</button>
                  </div>
                </form>
                <div>
                  <div className={`${style.teacherInfo} ${style.mariginTopBottom}`}>
                    <img
                      src={require("../../Img/course-content/jane.png")}
                      alt="User"
                    />
                    <p>Jane Doe</p>
                  </div>
                  <p className={style.previousComment}>
                    This was mind-blowing! I never knew chemical reactions could be so mesmerizing.
                  </p>
                  <div className={style.commentRating}>
                    <div className={style.arrowCommentIcon}>
                      <i className="fa-solid fa-arrow-up"></i>
                    </div>
                    <div className={style.arrowCommentIcon}>
                      <i className="fa-solid fa-arrow-down"></i>
                    </div>
                    <p className={style.timeSpend}>5 min ago</p>
                  </div>
                </div>
                <button className={style.learnMore}>Load More</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default CourseContent;