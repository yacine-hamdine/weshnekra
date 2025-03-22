import React from "react";
import PreviousIcon from "../assets/icons/previous.svg";
import NextIcon from "../assets/icons/next.svg";
import RestartIcon from "../assets/icons/restart.svg";
import AnimatedFinishButton from "../components/AnimatedFinishButton";

const QuizControls = ({
  currentIndex,
  questions,
  setCurrentIndex,
  handleFinishQuiz,
  setResponses,
  setRawScores,
  resultsGates,
  quizType,
  data,
  setDirection,
}) => {
  // We assume setCurrentIndexNext and setDirection are passed to manage next/prev navigation
  return (
    <div className="quiz-controls">
      <div className="quiz-previous">
        <button
          className="secondary-ctrl ctrl-btn"
          disabled={currentIndex === 0}
          onClick={() => {
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
          }}
        >
          <span className="ctrl-btn-icon">
            <img src={PreviousIcon} alt="previous" />
          </span>
          <span className="ctrl-btn-text">{data.quizPrevious}</span>
        </button>
      </div>
      <div className="quiz-restart">
        <button
          className="arbitrary-ctrl ctrl-btn"
          onClick={() => {
            setDirection(-1);
            setCurrentIndex(0);
            setResponses({});
            setRawScores(resultsGates.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}));
            localStorage.removeItem(`quiz_state_${quizType}`);
          }}
        >
          <span className="ctrl-btn-icon">
            <img src={RestartIcon} alt="restart" />
          </span>
          <span className="ctrl-btn-text">{data.quizRestart}</span>
        </button>
      </div>
      {currentIndex === questions.length - 1 ? (
        <AnimatedFinishButton handleFinishQuiz={handleFinishQuiz} data={data.finishQuiz} />
      ) : (
        <div className="quiz-next">
          <button
            className="main-ctrl ctrl-btn"
            disabled={currentIndex === questions.length - 1}
            onClick={() => {
              setDirection(1);
              setCurrentIndex((prev) => prev + 1);
            }}
          >
            <span className="ctrl-btn-text" style={{ color: "white" }}>
              {data.quizNext}
            </span>
            <span className="ctrl-btn-icon">
              <img src={NextIcon} alt="next" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizControls;
