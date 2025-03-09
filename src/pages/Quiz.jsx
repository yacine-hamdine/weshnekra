import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language"; // Import the context
import { Link } from "react-router-dom";
import "../styles/quiz.css";
import GenCatIcon from "../assets/icons/gen-cat.svg";
import XctSciIcon from "../assets/icons/xct-sci.svg";
import LthSciIcon from "../assets/icons/lth-sci.svg";
import HmnSciIcon from "../assets/icons/hmn-sci.svg";
import EcnBsnIcon from "../assets/icons/ecn-bsn.svg";
import SprSciIcon from "../assets/icons/spr-sci.svg";
import LngLitIcon from "../assets/icons/lng-lit.svg";
const Quiz = () => {

  const { translations } = useContext(LanguageContext);
  const data = translations;
  

  return (
    <>
      {
        // TODO: add a "Continue Quiz" component if user has already started the quiz and has not finished it
      }
      <div id="quiz-header">
        <h1 className="title">{data.quiz}</h1>
      </div>
      <div id="quiz-presentation">
        <div id="quiz-instructions">
          <h3 className="subtitle">{data.quizInstructions}</h3>
          <ul className="text">
            <li>
              {data.quizInstruction1}
            </li>
            <li>
              {data.quizInstruction2}
            </li>
            <li>
              {data.quizInstruction3}
            </li>
          </ul>
        </div>
        <div id="quiz-warning">
          <div id="warning-icon">
            ⚠️
          </div>
          <div id="warning-content">
            <h3 className="subtitle">{data.quizWarningTitle}</h3>
            <p className="text">{data.quizWarningText}</p>
          </div>
        </div>
      </div>
      <div id="quiz-select">
        <div id="quiz-select-title">
          <h3 className="title">{data.quizSelect}</h3>
        </div>
        <div id="quiz-select-options">
          <div className="quiz-select-option" id="gen-cat">
            <div className="option-icon">
              <img src={GenCatIcon} alt="General Category" />
            </div>
            <div className="option-name subtitle">
              {data.genCatName}
            </div>
            <div className="option-description text">
              {data.genCatDescription}
            </div>
            <div className="option-btn">
              <Link to={"/quiz/start"}>
                <button className="main-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
          <div className="quiz-select-option" id="xc-sci">
            <div className="option-icon">
              <img src={XctSciIcon} alt="Exact Sciences" />
            </div>
            <div className="option-name subtitle">
              {data.xctSciName}
            </div>
            <div className="option-description text">
              {data.xctSciDescription}
            </div>
            <div className="option-btn">
              <Link to={"/quiz/special/xct-sci"}>
                <button className="secondary-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
          <div className="quiz-select-option" id="hmn-sci">
            <div className="option-icon">
              <img src={HmnSciIcon} alt="Human & Social Sciences" />
            </div>
            <div className="option-name subtitle">
              {data.hmnSciName}
            </div>
            <div className="option-description text">
              {data.hmnSciDescription}
            </div>
            <div className="option-btn">
              <Link to={"/quiz/special/hmn-sci"}>
                <button className="secondary-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
          <div className="quiz-select-option" id="lth-sci">
            <div className="option-icon">
              <img src={LthSciIcon} alt="Health Sciences" />
            </div>
            <div className="option-name subtitle">
              {data.lthSciName}
            </div>
            <div className="option-description text">
              {data.lthSciDescription}
            </div>
            <div className="option-btn">
              <Link to={"/quiz/special/lth-sci"}>
                <button className="secondary-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
          <div className="quiz-select-option" id="lng-lit">
            <div className="option-icon">
              <img src={LngLitIcon} alt="Languages & Literature" />
            </div>
            <div className="option-name subtitle">
              {data.lngLitName}
            </div>
            <div className="option-description text">
              {data.lngLitDescription}
            </div>
            <div className="option-btn">
              <Link to={"/quiz/special/lng-lit"}>
                <button className="secondary-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
          <div className="quiz-select-option" id="ecn-bsn">
            <div className="option-icon">
              <img src={EcnBsnIcon} alt="Economics & Business" />
            </div>
            <div className="option-name subtitle">
              {data.ecnBsnName}
            </div>
            <div className="option-description text">
              {data.ecnBsnDescription}
            </div>
            <div className="option-btn">
              <Link to={"/quiz/special/ecn-bsn"}>
                <button className="secondary-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
          <div className="quiz-select-option" id="spr-sci">
            <div className="option-icon">
              <img src={SprSciIcon} alt="Sports & Physical Sciences" />
            </div>
            <div className="option-name subtitle">
              {data.sprSciName}
            </div>
            <div className="option-description text">
              {data.sprSciDescription}
            </div>
            <div className="option-btn">
              <Link to={"/quiz/special/spr-sci"}>
                <button className="secondary-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* 
  Exact Sciences : xct-sci
  Human & Social Sciences : hmn-sci
  Health Sciences : lth-sci
  Languages & Literature : lng-lit
  Economics & Business : ecn-bsn
  Sports & Physical Sciences : spr-sci
  Architecture & Design : arc-dsg
*/

export default Quiz