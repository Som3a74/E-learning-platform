import { useEffect, useState } from "react";
import style from "./CourseContent.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from './../Loading/LoadingPage';
import axios from "axios";

// https://selpapi20240618171141.azurewebsites.net/Content/GetContentForEachSubject?Id=15
// https://selpapi20240618171141.azurewebsites.net/SELP/V1/Subject/2
// https://selpapi20240618171141.azurewebsites.net/Content/SELP/V1/Content/9

function CourseContent() {
  const [like, setlike] = useState(100);
  const [dislike, setdislike] = useState(4);
  const [likeactive, setlikeactive] = useState(false);
  const [dislikeactive, setdislikeactive] = useState(false);
  const [chevron, setchevron] = useState(true);
  let navigate = useNavigate()

  let { SubjectId } = useParams()
  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(null)
  const [DataCourse, setDataCourse] = useState(null)
  const [VideoUrl, setVideoUrl] = useState("https://selpapi20240618171141.azurewebsites.net/Contents/videos/12ecff8f99bf448cbc4ec8ee92d6ca7c.mp4")

  const { userToken } = useSelector((state) => state.ApisliceToken);
  const getCourse = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://selpapi20240618171141.azurewebsites.net/Content/GetContentForEachSubject?Id=${SubjectId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );
      console.log(data)
      setDataCourse(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response.data.statusCode == 404) {
        setDataCourse("please add courses first")
      }
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
      return null;
    }
  };
  // useEffect(() => {
  //   getCourse();
  // }, [])
  useEffect(() => {
    getCourse();
  }, [userToken])

  function likef() {
    if (likeactive) {
      setlikeactive(false);
      setlike(like - 1);
    } else {
      setlikeactive(true);
      setlike(like + 1);
      if (dislikeactive) {
        setdislikeactive(false);
        setlike(like + 1);
        setdislike(dislike - 1);
      }
    }
  }
  function dislikef() {
    if (dislikeactive) {
      setdislikeactive(false);
      setdislike(dislike - 1);
    } else {
      setdislikeactive(true);
      setdislike(dislike + 1);
      if (likeactive) {
        setlikeactive(false);
        setdislike(dislike + 1);
        setlike(like - 1);
      }
    }
  }
  return <>
    {!Loading && DataCourse ?
      <div className={style.courseBody}>
        <div className={style.courseContent}>

          <div
            className={`${style.subjectContainer} ${style.gridMan} ${style.grid2Cols}`}
          >
            <section className={`${style.courseContent} ${style.videoContainer}`}>
              <div className={style.lessonBox}>


                <video className="w-100" controls src={VideoUrl}></video>

                <div className={style.likeDislike}>
                  <div className={style.teacherInfo}>
                    <img
                      src={require("../../Img/course-content/Ellipse 1.jpg")}
                      alt=""
                    />
                    <p>TeacherName</p>
                  </div>
                  <div className={style.like}>
                    <button className={style.parentLikeBtn} onClick={likef}>
                      <i
                        className={`fa-regular fa-thumbs-up ${style.likeIconBtn
                          } ${likeactive ? style.activeLike : null}`}
                      ></i>
                      {like}
                    </button>
                    <button className={style.parentLikeBtn} onClick={dislikef}>
                      <i
                        className={`fa-regular fa-thumbs-down ${style.likeIconBtn
                          } ${style.dislikeIcon} ${dislikeactive ? style.activeDislike : null
                          }`}
                      ></i>
                      &nbsp;{dislike}
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
                <p className={style.chapterTitle}>chapter 1</p>
                <i onClick={() => setchevron((e) => !e)}
                  className={`fa-solid fa-chevron-down ${style.arrowDownContent} `}
                ></i>
              </div>



              {console.log(DataCourse)}


              {DataCourse !== 'please add courses first' ?
                <ul style={{ display: chevron ? 'block' : 'none' }} className={style.chapterList}>
                  {DataCourse.map((item, index) =>
                    <li key={item.contentID} className={style.rowChapter}>
                      <Link onClick={() => navigate(`/Courses/CourseContent/CourseDetails/${item.contentID}`)} className="cursorPointer mb-3 text-decoration-none text-black fw-bold mt-3" >
                        <img className={style.playCricle} src={require("../../Img/course-content/play-cricle.png")} alt="" />
                        {item?.name}
                      </Link>
                    </li>
                  )
                  }

                </ul>
                : <div>
                  please add courses first
                </div>}
            </div>
          </div>














          <div className={`${style.feedbackForm} ${style.subjectContainer}`}>
            <div className={style.commentBox}>
              <h2 className={style.headingTertiary}>Comment</h2>
              <form action="" className={style.commentBoxChild}>
                <div className={style.teacherInfo}>
                  <img
                    src={require("../../Img/course-content/Ellipse 1.jpg")}
                    alt=""
                  />
                  <p>John Doe</p>
                </div>

                <input
                  type="text"
                  defaultValue=" I learned so much and it made the concepts crystal clear. Thanks for sharing........"
                />
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
                    alt=""
                  />
                  <p>Jane Doe</p>
                </div>
                <p className={style.previousComment}>
                  This was mind-blowing I never knew chemical reaction could be so
                  mesmerizing
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
      : <LoadingPage />}
  </>

}
export default CourseContent;