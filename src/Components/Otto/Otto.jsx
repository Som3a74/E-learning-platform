import React, { useState } from 'react'
import styleOutto from './Otto.module.css'
import Lottie from "lottie-react";
import OuttoAnimation from "../../Img/GPT/outto.json";
import runChat from './../../Config/gemini';

export default function Otto() {

  //toggle buttom to show chat and hidden it
  const [showChat, setshowChat] = useState(false)
  // data come from input
  const [input, setinput] = useState('')
  // save user data input to show it in face
  const [recentPrompt, setrecentPrompt] = useState('')
  // loading hhh
  const [loading, setloading] = useState(false)
  // response 
  const [resultData, setresultData] = useState(false)

  /* 
  بتاعها index انت هنا بيتبعتلك الكلمه اللي هتتعرض بال
   هنا وظيفته انه ياخر كل كلمه من انها تتعرض لو شلته هيظهر الكلام كله مره واحده index ال 
  */
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setresultData((prev) => prev + nextWord)
    }, 75 * index);
  }

  const onSend = async () => {
    setresultData('')
    setloading(true)
    setrecentPrompt(input)
    const response = await runChat(input)
    // make respone good to read
    let responseArray = response.split('**')
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      // بتقوله اول عنصر في المصفوفه و اي عنصر يقبل القسمه علي 2 حطهم جمله عاديه ليه لان انت فوق مقسمهم علي حسب ** البتاع ده و هو بيكون قبل الكلمات المفتاحيه ف انت ديما هتكون المصفوفه عندك جمله عاديه و جمله مفتاحيه ف انت بتاخد الجمله العاديه وتقوله ضيفا زي مهي و الكلمه المفتاحيه خليها عريضه
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i]
      }
      // هنا زي مقولنا فوق انت هتاخد الجمل المفتاحيه وتخليها عريضه
      else {
        newResponse += '<b>' + responseArray[i] + '</b>'
      }
    }

    // </br>  بيفضل عنك بين الجمل * البتاع ده فبنقسم المصفوفه تاني ونشيله منها و بعدين برنجعها استرنج و بنفصل بين الجمل 
    let newResponse2 = newResponse.split('*').join('</br>')
    let newresponseArray = newResponse2.split(' ')

    for (let i = 0; i < newresponseArray.length; i++) {
      const nextWord = newresponseArray[i]
      delayPara(i, nextWord + ' ')
    }

    setloading(false)
    setinput('')
  }

  return <>

    <aside className={`${styleOutto.ottoSize}`}>

      <Lottie className='animation__FedeIn' onClick={() => setshowChat(!showChat)} animationData={OuttoAnimation} />

      {showChat && <div className={`${styleOutto.chatSize} bg-white animation__FedeIn`}>

        <div className={`${styleOutto.hadderchat} bgMain`}>
          <div>
            <img style={{ width: '30px', marginRight: '7px' }} src={require('../../Img/GPT/outto.png')} alt="" />
            <span className='fw-bold text-white'>Outto</span>
          </div>
          <i onClick={() => setshowChat(!showChat)} className="fa-solid fa-x text-white cursorPointer"></i>
        </div>

        <div className={`${styleOutto.bodychat} text-white`}>

          <div className='d-flex align-items-center flex-column'>
            <div className='d-flex align-items-center w-100'>
              <img style={{ width: '30px', height: '30px', marginRight: '7px' }} src={require('../../Img/GPT/outto.png')} alt="" />
              <div className={`${styleOutto.textanswer} p-3 w-75 my-1 align-self-start text-dark rounded-3`}>
                <p className='m-0 textMain'>Hi how i can help you</p>
              </div>
            </div>
          </div>

          {loading && <div className={`${styleOutto.textanswer} p-1 w-50 my-1 align-self-start text-dark rounded-3 my-1 ms-4`}>
            <div className={`${styleOutto.loaderanimation} ms-3 my-2 p-0`}></div>
          </div>}

          {resultData && <div className={`${styleOutto.bodychat2} p-0 my-2`}>
            <div className={`${styleOutto.textQuistion} p-3 my-1 align-self-end bgMain  rounded-3 text-white fw-bold`}>
              <p className='m-0'>{recentPrompt}</p>
            </div>
            <div className='d-flex align-items-center w-100'>
              <img style={{ width: '30px', height: '30px', marginRight: '7px' }} src={require('../../Img/GPT/outto.png')} alt="" />
              <div className={`${styleOutto.textanswer} p-3 my-1 align-self-start text-dark rounded-3`}>
                <p className='m-0 textMain' dangerouslySetInnerHTML={{ __html: resultData }}></p>
              </div>
            </div>
          </div>}

        </div>

        <div className={`${styleOutto.footerchat}`}>
          <div className='d-flex w-100 align-items-center justify-content-between'>
            {input && <button onClick={() => onSend(input)} disabled={loading} className='border-0 bg-transparent'> <i className="fa-regular fa-paper-plane cursorPointer ms-3 me-4"></i></button>}
            <input onChange={(e) => setinput(e.target.value)} value={input} id='inputQuestion' className='form-control rounded-4 w-100' placeholder='Type a message...' type="text" />
          </div>
        </div>

      </div>}
    </aside>
  </>
}