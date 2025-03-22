// ResultsGrid.jsx
import React from "react";
import { Link } from "react-router-dom";
import toCamelCase from "../utils/toCamelCase";

const ResultsGrid = ({ savedResults, selectedResult, data, images }) => {
  return (
    <section id="results-list">
      <h2 className="subtitle">{data.savedResultsTitle}</h2>
      <div id="results-grid">
        {savedResults.map((result, idx) => (
          <div
            key={idx}
            className={`result-item ${
              selectedResult && selectedResult.quizType === result.quizType && selectedResult.state.finished
                ? "active"
                : ""
            }`}
          >
            <div className="item-icon">
              <img 
                src={images[`../assets/icons/${result.quizType}.svg`].default} 
                alt={data[`${toCamelCase(result.quizType).replace("-", "")}Name`]} 
              />
            </div>
            <div className="item-name">
              <h3 className="subtitle">
                {data[`${toCamelCase(result.quizType).replace("-", "")}Name`]}
              </h3>
            </div>
            <div className="item-progression">
              <div className="progression-text">
                <span>{result.state.savedIndex + 1}</span>/<span>{result.state.savedSize}</span>
              </div>
              <progress value={result.state.savedIndex + 1} max={result.state.savedSize} className="progression-bar"></progress>
            </div>
            <div className="item-action">
              {result.state.finished ? (
                <Link to={`/results/${result.quizType}`}>
                  <button className="secondary-btn">{data.viewResult}</button>
                </Link>
              ) : (
                <Link to={`/quiz/${result.quizType}`}>
                  <button className="secondary-btn">{data.continueQuiz}</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResultsGrid;
