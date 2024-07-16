import React from "react";
import style from "./Testbank.module.css";

export default function TestBank() {
  return (
    <div className={style.navTestContainer}>
      <nav className={style.aside}>
        <img
          className={style.selpImg}
          src={require("../../Img/Testbank/Selp.png")}
          alt="selp_img"
        />
        <p className={style.bankQuestions}>Bank Questions</p>
        <button className={style.btnTestBank}>Exam</button>
        <button className={`${style.subjectName} ${style.btnTestBank}`}>
          Chemistry
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={style.sizeUp}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <img
          className={style.upgradeIllustration}
          src={require("../../Img/Testbank/upgrade_illustration.png")}
          alt=""
        />
      </nav>
      <div className={style.questions}>
        <div className={style.testInfo}>
          <input
            type="text"
            className={style.searchFeild}
            placeholder="search a questions"
          />
          <select name="cars" id="cars">
            <option value="ch1">CH 1</option>
            <option value="ch2">CH 2</option>
            <option value="ch3">CH 3</option>
          </select>
        </div>
        <main className={style.content}>
          <table className={style.testTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Question and Options</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  What is the correct IUPAC name of the compound (3 – ethyl – 2
                  – butanol)?
                  <br />
                  A. 2 – ethyl – 3 – butanol
                  <br />
                  B. 2 – ethyl – 2 – butanol
                  <br />
                  C. 3 – methyl – 2 – pentanol
                  <br />
                  D. 2 – methyl – 3 – pentanol
                </td>
                <td className={style.answer}>B</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  Alkaline hydrolysis of 1,2-dichloro-benzene gives ………
                  <br />
                  A. phenol
                  <br />
                  B. catechol
                  <br />
                  C. pyrogalloll
                  <br />
                  D. toluene
                </td>
                <td className={style.answer}>A</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  All the following are considered as isomers for secondary
                  butyl alcohol except ………
                  <br />
                  A. 2 – butanol
                  <br />
                  B. isopropyl alcohol
                  <br />
                  C. 2 – methyl – 2 – propanol
                  <br />
                  D. tertiary butyl alcohol
                </td>
                <td className={style.answer}>C</td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  We can obtain an explosive substance from benzene through the
                  following steps ………
                  <br />
                  A. alkaline hydrolysis / chlorination / nitration
                  <br />
                  B. nitration / alkaline hydrolysis / chlorination
                  <br />
                  C. chlorination / alkaline hydrolysis / alkylation
                </td>
                <td className={style.answer}>B</td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  What is the chemical name of the produced ester from a
                  reaction of dibasic acid with dihydric alcohol?....
                  <br />
                  A. oil
                  <br />
                  B. fat
                  <br />
                  C. dacron
                  <br />
                  D. asprin
                </td>
                <td className={style.answer}>A</td>
              </tr>
              <tr>
                <td>6</td>
                <td>
                  What is the chemical name of the produced ester from a
                  reaction of dibasic acid with dihydric alcohol?....
                  <br />
                  A. oil
                  <br />
                  B. fat
                  <br />
                  C. dacron
                  <br />
                  D. asprin
                </td>
                <td className={style.answer}>A</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
