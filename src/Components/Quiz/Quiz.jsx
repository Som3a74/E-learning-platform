import { useState, useRef, useEffect } from 'react';
import style from './Quiz.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LoadingPage from '../Loading/LoadingPage';

export default function Quiz() {
  let { contentID } = useParams()
  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(null)
  const [questions, setquestions] = useState(null)

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [time, settime] = useState(10);
  const navigate = useNavigate();

  const { userToken } = useSelector((state) => state.ApisliceToken);

  const getCourse = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://selpapi20240618171141.azurewebsites.net/SELP/V1/Quiz/List`,
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );
      const dataQuiz = data.data.filter((ele) => ele.contentID == contentID)
      console.log(dataQuiz)
      setquestions(dataQuiz);
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

  // object to set in Answer if it is  correctAnswer or wrongAnswers
  const resultInitalState = {
    correctAnswers: 0,
    wrongAnswers: 0,
  };
  const [result, setResult] = useState(resultInitalState);

  let myInterval;

  // Fn to show question if he ckick button or time finshed 
  function onClickNext() {
    setAnswerIndex(null)
    settime(10)

    // check answer true of false
    if (answer && answer !== null) {
      setResult({ ...result, correctAnswers: result.correctAnswers + 1 })
    } else {
      setResult({ ...result, wrongAnswers: result.wrongAnswers + 1 })

    }

    // check if questions finshed
    if (currentQuestion !== questions.length - 1) { // if not finshed show next question
      setCurrentQuestion((e) => e + 1);
    } else { // if finshed show result page
      setCurrentQuestion(0);
      setShowResult(true);
      return clearInterval(myInterval)
    }
  }

  // set Answer Index to show if it is true or false
  function onAnwswerClick(answer, index) {
    setAnswerIndex(index)

    if (answer === questions[currentQuestion].correctAnswer) {
      console.log(answer)
      setAnswer(true)
    } else {
      setAnswer(false)
    }
  }


  // Fn to decrease time and call onClickNext When timer be 0 and reset it 10
  function Fn_timer() {
    // console.log(time)
    settime(time - 1)

    if (time === 0) {
      onClickNext()
      settime(10)
    }
  }

  // every Rerender (time decrease) call it to decrease time again
  useEffect(() => {
    myInterval = setInterval(Fn_timer, 1000);
    return () => {
      clearInterval(myInterval)
    }
  })

  //to stop time when Component Died
  useEffect(() => {
    return (() => {
      console.log("dieeeeeeeeeeeeeeeeeeeeeeee");
      clearInterval(myInterval)
    })
  }, [])

  //to stop time when showResult
  useEffect(() => {
    return (() => {
      console.log("showResult die");
      clearInterval(myInterval)
    })
  }, [showResult])



  return <>
    {!Loading && questions ?
      <>

        {questions.length !== 0 ?
          <>
            {!showResult ?

              <main className='vh-100 d-flex align-items-center' style={{ backgroundImage: `url(${require('../../Img/Profile/wallpaper-pattern.webp')})` }}>
                <div className='container-fluid'>
                  <div className='row justify-content-evenly mx-4'>

                    <section className='col-md-7 col-sm-12'>

                      {/* Time & question Number */}
                      <div className='d-flex align-items-center justify-content-evenly mb-5'>
                        <h6 className='fw-semibold' style={{ color: '#A42FC1' }}>Question : <span className='text-black fw-semibold h5'>{currentQuestion + 1}</span>/<span>{questions.length}</span> </h6>
                        <h5 className='fw-semibold text-danger'>time : <span className='text-black'>{time}s</span></h5>
                      </div>

                      {/* Show question */}
                      <div className='text-center'>
                        <h3 className='mb-4'>{questions[currentQuestion].question}</h3>

                        <ul className='list-unstyled'>
                          <li onClick={() => onAnwswerClick(questions[currentQuestion].ans1, 0)} className={`${style.Quis_li} rounded-4 p-2 mb-4 text-center mx-auto ${answerIdx === 0 && style.selected_answer}`} >
                            <h4 className='m-0'>{questions[currentQuestion].ans1}</h4>
                          </li>
                          <li onClick={() => onAnwswerClick(questions[currentQuestion].ans2, 1)} className={`${style.Quis_li} rounded-4 p-2 mb-4 text-center mx-auto ${answerIdx === 1 && style.selected_answer}`} >
                            <h4 className='m-0'>{questions[currentQuestion].ans2}</h4>
                          </li>
                          <li onClick={() => onAnwswerClick(questions[currentQuestion].ans3, 2)} className={`${style.Quis_li} rounded-4 p-2 mb-4 text-center mx-auto ${answerIdx === 2 && style.selected_answer}`} >
                            <h4 className='m-0'>{questions[currentQuestion].ans3}</h4>
                          </li>
                          <li onClick={() => onAnwswerClick(questions[currentQuestion].ans4, 3)} className={`${style.Quis_li} rounded-4 p-2 mb-4 text-center mx-auto ${answerIdx === 3 && style.selected_answer}`} >
                            <h4 className='m-0'>{questions[currentQuestion].ans4}</h4>
                          </li>
                        </ul>

                      </div>

                      {/* Button Next*/}
                      <div className='mt-4'>
                        <button onClick={() => onClickNext()} disabled={answerIdx == null} type="button" className={`border-0 text-white px-4 py-3 rounded-4 secondbackground ${style.buttonNext}`} >
                          {currentQuestion === questions.length - 1 ? "Finish" : `Next >`}
                        </button>
                      </div>

                    </section>


                    {/* Image */}
                    <section className={`${style.displaysm} col-md-4 col-sm-12`}>
                      <div className='d-flex justify-content-center position-relative'>
                        <img className='' style={{ width: '470px', height: '480px' }} loading='lazy' src={require('../../Img/Quiz/imgTask.png')} alt="" />
                      </div>
                    </section>

                  </div>
                </div>
              </main>

              :
              <section>
                <div className='w-100 vh-100 flex-column d-flex justify-content-center align-items-center '>
                  <img style={{ width: '400px' }} src={require('../../Img/Quiz/result.png')} alt="result" />
                  <button
                    onClick={() => navigate(`/Result/${result.correctAnswers}/${result.wrongAnswers}`, { replace: true })}
                    type="button"
                    style={{ background: 'linear-gradient(0deg, #150080 0.03%, #d08642)' }}
                    className={`border-0 text-white px-5 py-3 rounded-4 secondbackground mt-2 ${style.buttonNext}`} >
                    Result
                  </button>
                </div>
              </section>
            }
          </>

          :
          <section>
            <div className='w-100 vh-100 flex-column d-flex justify-content-center align-items-center '>
                <h1 className='fw-bold'>Teacher not create yet</h1>
                <Link to={'/'} className='fw-bold'>Back Home</Link>
            </div>
          </section>
        }
      </>
      : <LoadingPage />}
  </>
}