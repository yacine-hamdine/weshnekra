import { useState, useEffect, useContext } from "react";
import { useLanguage } from "../contexts/language"; // Import the context
import Loading from "../components/Loading";
import "../styles/results.css";
import CalculationIcon from "../assets/icons/calculation.svg";
import InterpretationIcon from "../assets/icons/chart.svg";
import UsageIcon from "../assets/icons/research.svg";
// import { Bar } from "react-chartjs-2"; // For charting (bar graph)
// import { getPreviousResults } from "../utils/quizStorage"; // Function to get results from LocalStorage

const Results = ({ quizType }) => {

  const { translations, loading } = useLanguage();
  const data = translations;

  if (loading) return <Loading />;

  // const [results, setResults] = useState(null);

  // useEffect(() => {
  //   setResults(getPreviousResults(quizType));
  // }, [quizType]);

  // if (!results) return <p>No results found. Take the quiz first!</p>;

  {
    // TODO: fetch results from localStorage and display them
  }

  return (
    <>
      <section id="results-header">
        <h1 className="title">{data.results}</h1>
      </section>
      <section id="results-display">
        {/* <Bar
          data={{
            labels: Object.keys(results),
            datasets: [
              {
                data: Object.values(results),
                backgroundColor: "blue", // Customize chart color
              },
            ],
          }}
        />
        <h3>Recommended Path: {Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b)}</h3> */}
      </section>
      <section id="results-infos">
          <div className="results-info">
            <div className="results-info-image">
              <img src={CalculationIcon} alt="Icon" />
            </div>
            <div className="results-info-text">
              <h2 className="subtitle">
                {data.howResultsAreCalculated}
              </h2>
              <p className="text">
                {data.resultsCalculation}
              </p>
            </div>
          </div>
          <div className="results-info">
            <div className="results-info-image">
              <img src={InterpretationIcon} alt="Icon" />
            </div>
            <div className="results-info-text">
              <h2 className="subtitle">
                {data.howToInterpretResults}
              </h2>
              <p className="text">
                {data.resultsInterpretation}
              </p>
            </div>
          </div>
          <div className="results-info">
            <div className="results-info-image">
              <img src={UsageIcon} alt="Icon" />
            </div>
            <div className="results-info-text">
              <h2 className="subtitle">
                {data.howToUseResults}
              </h2>
              <p className="text">
                {data.resultsUsage}
              </p>
            </div>
          </div>
      </section>
    </>
  );
};

export default Results;
