import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/language"; // Import the context
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useQuizLogic from "../hooks/useQuizLogic";
import PreviousIcon from "../assets/icons/previous.svg";
import NextIcon from "../assets/icons/next.svg";
import RestartIcon from "../assets/icons/restart.svg";


const StartQuiz = () => {

    const { language, translations, loading } = useLanguage();
    const data = translations;

    const [questions, responses, rawScores, normalizedScores, currentIndex, handleSliderChange, setCurrentIndex, categories, setRawScores, setResponses] = useQuizLogic("categorized");

    const colors = ["#ff0000", "#ff5500", "#ffaa00", "#cbcb00", "#88d100", "#00ff00"]

    if (loading) return <Loading />;

    return (
      <>
        <div className="quiz-title title">
          {data.genCatName}
        </div>

        <div className="quiz-progress">
            <div className="quiz-progress-content">
                <div className="quiz-progress-title text">
                    {data.progress}
                </div>
                <div className="quiz-progress-index text">
                    <span>{currentIndex + 1}</span>/<span>{questions.length}</span>
                </div>
            </div>
            {/* <motion.div
              className="progress-bar"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentIndex + 1) * 100 / questions.lengh}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            /> */}
            <progress value={currentIndex + 1} max={questions.length} className="quiz-progress-bar"></progress>
        </div>

        <div className="quiz-widget">

          <div className="quiz-content">
            
            {questions.length > 0 ? (
              <div className="quiz-card-question" key={questions[currentIndex].id}>
                <div className="quiz-card-question-content subtitle">
                    {questions[currentIndex][language]}
                </div>
                <div className="quiz-card-question-value">
                    <span className="input-value-box" style={{ backgroundColor: `${colors[responses[questions[currentIndex].id] || 0]}35` }}>
                        <b className="input-value-content" style={{ color: `${colors[responses[questions[currentIndex].id] || 0]}` }}>
                          {responses[questions[currentIndex].id] || 0}
                        </b>
                    </span>
                </div>
                <div className="quiz-card-question-input">
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={responses[questions[currentIndex].id] || 0}
                        onChange={(e) => handleSliderChange(questions[currentIndex].id, Number(e.target.value), questions[currentIndex].weights)}
                        className="input-slider"
                    />

                </div>
                <div className="quiz-card-question-data text">
                    <div className="quiz-card-question-data-min">
                        <span className="quiz-card-question-data-min-num" style={{ color: colors[0] }}>0</span>
                        <br />
                        <span className="quiz-card-question-data-min-text">{data.disagree}</span>
                    </div>
                    <div className="quiz-card-question-data-min">
                        <span className="quiz-card-question-data-min-num" style={{ color: colors[5] }}>5</span>
                        <br />
                        <span className="quiz-card-question-data-min-text">{data.agree}</span>
                    </div>
                </div>
              </div>
              // <div key={questions[currentIndex].id}>
              //   <h2 className="subtitle">{questions[currentIndex].en}</h2>
              //   <input
              //     type="range"
              //     min="0"
              //     max="5"
              //     value={responses[questions[currentIndex].id] || 0}
              //     onChange={(e) => handleSliderChange(questions[currentIndex].id, Number(e.target.value), questions[currentIndex].weights)}
              //   />
              // </div>
            ) : (
              <Loading />
            )}

          </div>

          <div className="quiz-controls">
          <div className="quiz-previous">
              <button className="secondary-ctrl ctrl-btn"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                >
                <span className="ctrl-btn-icon">
                  <img src={PreviousIcon} alt="previous" />
                </span>
                <span className="ctrl-btn-text">
                  {data.quizPrevious}
                </span>
              </button>
            </div>
            <div className="quiz-restart">
              <button className="arbitrary-ctrl ctrl-btn"
                disabled={currentIndex === 0}
                onClick={() => {
                  setCurrentIndex(0);
                  setResponses({});
                  setRawScores(categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}) );
                }}
                >
                <span className="ctrl-btn-icon">
                  <img src={RestartIcon} alt="restart" />
                </span>
                <span className="ctrl-btn-text">
                  {data.quizRestart}
                </span>
              </button>
            </div>
            { currentIndex === questions.length - 1 ? 
                (
                  <button onClick={() => {
                    console.log(`Final RawScores: `, rawScores, `Final NormalizedScores: `, normalizedScores);
                    alert(`Recommended Categories :\n ${Array.from(Object.keys(normalizedScores).sort((a, b) => normalizedScores[b] - normalizedScores[a])).join("\n")}`);
                  }} className="main-btn">{data.finishQuiz}</button>
                )
                :
                 (
                  <div className="quiz-next">
                    <button className="main-ctrl ctrl-btn"
                      disabled={currentIndex === questions.length - 1}
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      >
                      <span className="ctrl-btn-text" style={{ color: "white" }}>
                        {data.quizNext}
                      </span>
                      <span className="ctrl-btn-icon">
                        <img src={NextIcon} alt="next" />
                      </span>
                    </button>
                  </div>
                )
            }
          </div>

        </div>
      </>
    )

}

export default StartQuiz