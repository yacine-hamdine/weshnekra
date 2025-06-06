import React from "react";
import { useLanguage } from "../contexts/language"; // Import the context
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import "../styles/quiz.css";
import GenCatIcon from "../assets/icons/gen-cat.svg";
import XctSciIcon from "../assets/icons/xct-sci.svg";
import LthSciIcon from "../assets/icons/lth-sci.svg";
import HmnSciIcon from "../assets/icons/hmn-sci.svg";
import EcnBsnIcon from "../assets/icons/ecn-bsn.svg";
import ArcDsgIcon from "../assets/icons/arc-dsg.svg"
import SprSciIcon from "../assets/icons/spr-sci.svg";
import LngLitIcon from "../assets/icons/lng-lit.svg";
const Quiz = () => {

  const { translations, loading } = useLanguage();
  const data = translations;
  
  if (loading) return <Loading />;

  return (
    <>
      <section id="quiz-header">
        <h1 className="title">{data.quiz}</h1>
      </section>
      <section id="quiz-presentation">
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
      </section>
      <section id="quiz-select">
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
              <Link to={"/quiz/gen-cat"}>
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
              <Link to={"/quiz/xct-sci"}>
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
              <Link to={"/quiz/hmn-sci"}>
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
              <Link to={"/quiz/lth-sci"}>
                <button className="secondary-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
          <div className="quiz-select-option" id="arc-dsg">
            <div className="option-icon">
              <img src={ArcDsgIcon} alt="Architecture & Urbanism" />
            </div>
            <div className="option-name subtitle">
              {data.arcDsgName}
            </div>
            <div className="option-description text">
              {data.arcDsgDescription}
            </div>
            <div className="option-btn">
              <Link to={"/quiz/arc-dsg"}>
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
              <Link to={"/quiz/lng-lit"}>
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
              <Link to={"/quiz/ecn-bsn"}>
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
              <Link to={"/quiz/spr-sci"}>
                <button className="secondary-btn">
                  {data.startQuiz}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
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