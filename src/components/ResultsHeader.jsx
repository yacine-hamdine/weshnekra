// ResultsHeader.jsx
import React from "react";
import toCamelCase from "../utils/toCamelCase";

const ResultsHeader = ({ quizType, data }) => {
  return (
    <section id="results-header">
      <h1 className="title">
        {data.results} 
      </h1>
      <h2 className="subtitle">
        {data[`${toCamelCase(quizType)?.replace("-", "")}Name`] || ""}
      </h2>
     
    </section>
  );
};

export default ResultsHeader;
