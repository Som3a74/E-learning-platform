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
          alt="upgrade illustration"
        />
      </nav>
      <div className={style.questions}>
        <div className={style.testInfo}>
          <input
            type="text"
            className={style.searchFeild}
            placeholder="Search a question"
          />
          <select name="chapter" id="chapter">
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
              {[
                {
                  id: 1,
                  question: "What is the correct IUPAC name of the compound (3 – ethyl – 2 – butanol)?",
                  options: ["A. 2 – ethyl – 3 – butanol", "B. 2 – ethyl – 2 – butanol", "C. 3 – methyl – 2 – pentanol", "D. 2 – methyl – 3 – pentanol"],
                  answer: "B",
                },
                {
                  id: 2,
                  question: "Alkaline hydrolysis of 1,2-dichloro-benzene gives ………",
                  options: ["A. phenol", "B. catechol", "C. pyrogallol", "D. toluene"],
                  answer: "A",
                },
                {
                  id: 3,
                  question: "All the following are considered as isomers for secondary butyl alcohol except ………",
                  options: ["A. 2 – butanol", "B. isopropyl alcohol", "C. 2 – methyl – 2 – propanol", "D. tertiary butyl alcohol"],
                  answer: "C",
                },
                {
                  id: 4,
                  question: "We can obtain an explosive substance from benzene through the following steps ………",
                  options: ["A. alkaline hydrolysis / chlorination / nitration", "B. nitration / alkaline hydrolysis / chlorination", "C. chlorination / alkaline hydrolysis / alkylation"],
                  answer: "B",
                },
                {
                  id: 5,
                  question: "What is the chemical name of the produced ester from a reaction of dibasic acid with dihydric alcohol?....",
                  options: ["A. oil", "B. fat", "C. dacron", "D. asprin"],
                  answer: "A",
                },
                {
                  id: 6,
                  question: "What is the chemical name of the produced ester from a reaction of dibasic acid with dihydric alcohol?....",
                  options: ["A. oil", "B. fat", "C. dacron", "D. asprin"],
                  answer: "A",
                },
              ].map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.question}
                    <br />
                    {item.options.map((option, index) => (
                      <div key={index}>{option}</div>
                    ))}
                  </td>
                  <td className={style.answer}>{item.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}