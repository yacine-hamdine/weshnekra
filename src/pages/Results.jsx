import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../contexts/language"; // Language context
import Loading from "../components/Loading";
import "../styles/results.css";
import CalculationIcon from "../assets/icons/calculation.svg";
import InterpretationIcon from "../assets/icons/chart.svg";
import UsageIcon from "../assets/icons/research.svg";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Results = () => {
  const { quizType } = useParams(); // Retrieve the quizType param if provided
  const { translations, loading } = useLanguage();
  const data = translations;

  // State to hold all saved quiz states and the one that is currently selected
  const [savedResults, setSavedResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  // Load saved results from localStorage (keys starting with "quiz_state_")
  useEffect(() => {
    const results = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("quiz_state_")) {
        try {
          const parsed = JSON.parse(localStorage.getItem(key));
          results.push({ quizType: key.replace("quiz_state_", ""), state: parsed });
        } catch (error) {
          console.error("Error parsing localStorage key", key, error);
        }
      }
    }
    setSavedResults(results);
  
    if (quizType) {
      const found = results.find((r) => r.quizType === quizType);
      setSelectedResult(found || null);
    } else {
      // When no quizType is provided, do not auto-select a result.
      setSelectedResult(null);
    }
  }, [quizType]);  

  if (loading) return <Loading />;

  // Extract the scores from the selected result (assuming savedScores was saved)
  const scores = selectedResult?.state.savedScores || {};

  // Compute top 3 recommendations (sorted descending by score)
  const top3 = Object.keys(scores)
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 3);

  // Prepare data for the bar chart
  const chartData = {
    labels: Object.keys(scores),
    datasets: [
      {
        label: data.resultsChartLabel || "Scores",
        data: Object.values(scores),
        backgroundColor: "blue",
      },
    ],
  };

  console.log("quizType:", quizType);

  return (
    <>
      {/* Section 1: Header */}
      <section id="results-header">
        <h1 className="title">{data.results}</h1>
      </section>

      {/* Section 2: Selected Result Display */}
      {
        selectedResult
        &&
        <section id="selected-result">
          <div className="result-chart">
            <Bar data={chartData} />
          </div>
          <div className="result-recommendation">
            <h3>{data.recommendedPath || "Recommended Path:"}</h3>
            <ul>
              {top3.map((cat, idx) => (
                <li key={idx}>{cat}</li>
              ))}
            </ul>
          </div>
        </section>
      }

      {/* Section 3: Grid/List of Saved Quiz Results */}
      <section id="results-list">
        <h2 className="subtitle">{data.savedResultsTitle || "Saved Quiz Results"}</h2>
        <div className="results-grid">
          {savedResults.map((result, idx) => (
            <div
              key={idx}
              className={`result-item ${selectedResult && selectedResult.quizType === result.quizType ? "active" : ""}`}
              onClick={() => setSelectedResult(result)}
            >
              <p>{result.quizType}</p>
              {/* Optionally display a quick summary of the scores */}
              <ul>
                {Object.entries(result.state.savedScores || {}).map(([cat, score]) => (
                  <li key={cat}>
                    {cat}: {score}
                  </li>
                ))}
              </ul>
              <button>{data.viewResult || "View Result"}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Explanation / Information */}
      <section id="results-infos">
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
      </section>
    </>
  );
};

export default Results;











// import { useState, useEffect, useContext } from "react";
// import { useLanguage } from "../contexts/language"; // Import the context
// import Loading from "../components/Loading";
// import "../styles/results.css";
// import CalculationIcon from "../assets/icons/calculation.svg";
// import InterpretationIcon from "../assets/icons/chart.svg";
// import UsageIcon from "../assets/icons/research.svg";
// // import { Bar } from "react-chartjs-2"; // For charting (bar graph)
// // import { getPreviousResults } from "../utils/quizStorage"; // Function to get results from LocalStorage

// const Results = ({ quizType }) => {

//   const { translations, loading } = useLanguage();
//   const data = translations;

//   if (loading) return <Loading />;

//   // const [results, setResults] = useState(null);

//   // useEffect(() => {
//   //   setResults(getPreviousResults(quizType));
//   // }, [quizType]);

//   // if (!results) return <p>No results found. Take the quiz first!</p>;

//   {
//     // TODO: fetch results from localStorage and display them
//   }

//   return (
//     <>
//       <section id="results-header">
//         <h1 className="title">{data.results}</h1>
//       </section>
//       <section id="results-display">
//         {/* <Bar
//           data={{
//             labels: Object.keys(results),
//             datasets: [
//               {
//                 data: Object.values(results),
//                 backgroundColor: "blue", // Customize chart color
//               },
//             ],
//           }}
//         />
//         <h3>Recommended Path: {Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b)}</h3> */}
//       </section>
//       <section id="results-infos">
//           <div className="results-info">
//             <div className="results-info-image">
//               <img src={CalculationIcon} alt="Icon" />
//             </div>
//             <div className="results-info-text">
//               <h2 className="subtitle">
//                 {data.howResultsAreCalculated}
//               </h2>
//               <p className="text">
//                 {data.resultsCalculation}
//               </p>
//             </div>
//           </div>
//           <div className="results-info">
//             <div className="results-info-image">
//               <img src={InterpretationIcon} alt="Icon" />
//             </div>
//             <div className="results-info-text">
//               <h2 className="subtitle">
//                 {data.howToInterpretResults}
//               </h2>
//               <p className="text">
//                 {data.resultsInterpretation}
//               </p>
//             </div>
//           </div>
//           <div className="results-info">
//             <div className="results-info-image">
//               <img src={UsageIcon} alt="Icon" />
//             </div>
//             <div className="results-info-text">
//               <h2 className="subtitle">
//                 {data.howToUseResults}
//               </h2>
//               <p className="text">
//                 {data.resultsUsage}
//               </p>
//             </div>
//           </div>
//       </section>
//     </>
//   );
// };

// export default Results;
