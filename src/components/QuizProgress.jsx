import React from "react";
import { motion } from "framer-motion";

const QuizProgress = ({ currentIndex, totalQuestions, data }) => {
  const progressPercentage =
    totalQuestions > 0 ? ((currentIndex + 1) * 100) / totalQuestions : 0;
  return (
    <div className="quiz-progress">
      <div className="quiz-progress-content">
        <div className="quiz-progress-title text">{data.progress}</div>
        <div className="quiz-progress-index text">
          <span>{currentIndex + 1}</span>/<span>{totalQuestions}</span>
        </div>
      </div>
      <div className="quiz-progress-bar-container">
        <motion.div
          className="progress-bar"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            height: "10px",
            backgroundColor: "#000000",
            borderRadius: "5px",
          }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
