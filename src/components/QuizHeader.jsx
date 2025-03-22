import React from "react";
import toCamelCase from "../utils/toCamelCase";

const QuizHeader = ({ quizType, data }) => {
  return (
    <div className="quiz-title title">
      {data[`${toCamelCase(quizType).replace("-", "")}Name`]}
    </div>
  );
};

export default QuizHeader;
