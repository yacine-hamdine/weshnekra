// ResultsFAQs.jsx
import React from "react";
import CalculationIcon from "../assets/icons/calculation.svg";
import InterpretationIcon from "../assets/icons/chart.svg";
import UsageIcon from "../assets/icons/research.svg";

const ResultsFAQs = ({ data }) => {
  return (
    <section id="results-faqs">
      <h2 className="subtitle">FAQs</h2>
      <div id="results-infos">
        <div className="results-info">
          <div className="results-info-image">
            <img src={CalculationIcon} alt="Calculation Icon" />
          </div>
          <div className="results-info-text">
            <h2 className="subtitle">{data.howResultsAreCalculated}</h2>
            <p className="text">{data.resultsCalculation}</p>
          </div>
        </div>
        <div className="results-info">
          <div className="results-info-image">
            <img src={InterpretationIcon} alt="Interpretation Icon" />
          </div>
          <div className="results-info-text">
            <h2 className="subtitle">{data.howToInterpretResults}</h2>
            <p className="text">{data.resultsInterpretation}</p>
          </div>
        </div>
        <div className="results-info">
          <div className="results-info-image">
            <img src={UsageIcon} alt="Usage Icon" />
          </div>
          <div className="results-info-text">
            <h2 className="subtitle">{data.howToUseResults}</h2>
            <p className="text">{data.resultsUsage}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsFAQs;
