// ResultsChartSection.jsx
import React from "react";
import ScoreChart from "./ScoreChart";
import { Link } from "react-router-dom";
import toCamelCase from "../utils/toCamelCase";

const ResultsChart = ({ 
  hybridScores, 
  data, 
  quizType, 
  images, 
  getHybridScorePercentage 
}) => {
  // Compute top 3 hybrid scores:
  const top3Hybrid = Object.keys(hybridScores)
    .sort((a, b) => hybridScores[b] - hybridScores[a])
    .slice(0, 3);
  
  // Build chart data (using a percentage for each category)
  const allKeys = [...new Set(Object.keys(hybridScores))];
  const chartData = allKeys.map((key) => ({
    resultGate: data[`${toCamelCase(key).replace("-", "")}Name`],
    score4: getHybridScorePercentage(hybridScores, key)
  }));

  return (
    <section id="selected-result">
      <div className="result-chart">
        <ScoreChart data={chartData} />
      </div>
      <div className="result-recommendation">
        <div id="recommended-gates">
          <h2 className="subtitle">{data.recommendedPath}</h2>
          {top3Hybrid.map((cat, idx) => (
            <div key={idx} className="recommended-gate">
              <div className="gate-content">
                <div className="gate-icon">
                  <img 
                    src={images[`../assets/icons/${cat}.svg`].default} 
                    alt={data[`${toCamelCase(cat).replace("-", "")}Name`]} 
                  />
                </div>
                <div className="gate-name">
                  <h3 className="text blg">
                    {data[`${toCamelCase(cat).replace("-", "")}Name`]}
                  </h3>
                </div>
                <div className="gate-score">
                  <h3 className="subtitle">
                    {Math.round(getHybridScorePercentage(hybridScores, cat))}%
                  </h3>
                </div>
              </div>
              {quizType === "gen-cat" && (
                <div className="gate-action">
                  <Link to={`/quiz/${cat}`}>
                    <button className={idx === 0 ? "main-btn" : "secondary-btn"}>
                      {data.quizMeThis}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsChart;
