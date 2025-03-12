import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/language"; // Import the context
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import useQuizLogic from "../hooks/useQuizLogic";
import QuestionCard from "../components/QuestionCard";
import PreviousIcon from "../assets/icons/previous.svg";
import NextIcon from "../assets/icons/next.svg";
import RestartIcon from "../assets/icons/restart.svg";


const StartQuiz = () => {

    const { language, translations, loading } = useLanguage();
    const data = translations;

    const [questions, responses, scores, currentIndex, handleSliderChange, setCurrentIndex] = useQuizLogic("categorized");

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
                    <span id="input-value">
                        {responses[questions[currentIndex].id] || 0}
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
                        <span>0</span>
                        <span>{data.disagree}</span>
                    </div>
                    <div className="quiz-card-question-data-min">
                        <span>5</span>
                        <span>{data.agree}</span>
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
              <button className="secondary-btn ctrl-btn-pre"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                >
                <span className="ctrl-btn-pre-icon">
                  <img src={PreviousIcon} alt="previous" />
                </span>
                <span className="ctrl-btn-pre-text">
                  {data.quizPrevious}
                </span>
              </button>
            </div>
            <div className="quiz-restart">
              <button className="secondary-btn ctrl-btn-pre"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(0)}
                >
                <span className="ctrl-btn-res-icon">
                  <img src={RestartIcon} alt="restart" />
                </span>
                <span className="ctrl-btn-res-text">
                  {data.quizRestart}
                </span>
              </button>
            </div>
            { currentIndex === questions.length - 1 ? 
                (
                  <button onClick={() => console.log("Final Scores:", scores)} className="main-btn">{data.finishQuiz}</button>
                )
                :
                 (
                  <div className="quiz-next">
                    <button className="main-btn ctrl-btn-pre"
                      disabled={currentIndex === questions.length - 1}
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      >
                      <span className="ctrl-btn-nex-text" style={{ color: "white" }}>
                        {data.quizNext}
                      </span>
                      <span className="ctrl-btn-nex-icon">
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