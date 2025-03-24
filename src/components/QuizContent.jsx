import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../components/Loading";

const variants = {
  initial: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.15, ease: "easeInOut" },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.15, ease: "easeInOut" },
  }),
};

const QuizContent = ({
  questions,
  language,
  currentIndex,
  direction,
  handleSliderChange,
  responses,
  colors,
  data,
}) => {
  if (questions.length === 0) return <Loading />;

  const responseVal = responses[questions[currentIndex].id]; // response value default and min is 1

  return (
    <div className="quiz-content" style={{ position: "relative", minHeight: "250px" }}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: "absolute", width: "100%" }}
        >
          <div className="quiz-card-question">
            <div className="quiz-card-question-content subtitle">
              {questions[currentIndex][language]}
            </div>
            <div className="quiz-card-question-value">
              <span
                className="input-value-box"
                style={{
                  backgroundColor: `${colors[responseVal - 1]}35`,
                }}
              >
                <b
                  className="input-value-content"
                  style={{
                    color: `${colors[responseVal - 1]}`,
                  }}
                >
                  {responses[questions[currentIndex].id] || 1}
                </b>
              </span>
            </div>
            <div className="quiz-card-question-input">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={responses[questions[currentIndex].id] || 1}
                onChange={(e) =>
                  handleSliderChange(
                    questions[currentIndex].id,
                    Number(e.target.value),
                    questions[currentIndex].weights
                  )
                }
                className="input-slider"
              />
            </div>
            <div className="quiz-card-question-data text">
              <div className="quiz-card-question-data-min">
                <span className="quiz-card-question-data-min-num" style={{ color: colors[0] }}>
                  1
                </span>
                <br />
                <span className="quiz-card-question-data-min-text">
                  {data.disagree}
                </span>
              </div>
              <div className="quiz-card-question-data-min">
                <span className="quiz-card-question-data-min-num" style={{ color: colors[4] }}>
                  5
                </span>
                <br />
                <span className="quiz-card-question-data-min-text">
                  {data.agree}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizContent;
