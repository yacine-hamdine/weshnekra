import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../contexts/language"; // Language context
import Loading from "../components/Loading";
import ScoreChart from "../components/ScoreChart";
import "../styles/results.css";
import CalculationIcon from "../assets/icons/calculation.svg";
import InterpretationIcon from "../assets/icons/chart.svg";
import UsageIcon from "../assets/icons/research.svg";
import toCamelCase from "../utils/toCamelCase";


const images = import.meta.glob("../assets/icons/*.svg", { eager: true });

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
      // Optionally auto-select one if you want:
      setSelectedResult(null);
    }
  }, [quizType]);

  if (loading) return <Loading />;

  // Extract the scores from the selected result (assuming savedScores was saved)
  const hybridScores = selectedResult?.state.savedHybridScores || {};

  // Percentage helper function for hybridScores
  const getHybridScorePercentage = (hybridScores, gate) => {
    // Sum all hybrid scores
    const total = Object.values(hybridScores).reduce((sum, score) => sum + score, 0);
    if (total === 0) return 0; // Avoid division by zero
    
    // Calculate percentage for the given category
    const gateScore = hybridScores[gate] || 0;
    return (gateScore / total) * 100;
  }

  // Compute top 3 recommendations (sorted descending by score)

  const top3Hybrid = Object.keys(hybridScores)
    .sort((a, b) => hybridScores[b] - hybridScores[a])
    .slice(0, 3);

  const allKeys = [
    ...new Set([
      ...Object.keys(hybridScores),
    ]),
  ];
    
  // Transform scores into an array of objects for Recharts
  const chartData = allKeys.map((key) => ({
    resultGate: data[`${toCamelCase(key).replace("-", "")}Name`],
    score4: hybridScores[key] || 0,
  }));

  return (
    <>
      {/* Section 1: Header */}
      <section id="results-header">
        <h1 className="title">{data.results}</h1>
      </section>

      {/* Section 2: Selected Result Display */}
      {selectedResult?.state?.finished && (
        <section id="selected-result">
          <div className="result-chart">
            <ScoreChart data={chartData} />
          </div>
          <div className="result-recommendation">
            <div id="recommended-gates">
              <h2 className="subtitle">{data.recommendedPath || "Recommended Categories:"}</h2>
                {
                  top3Hybrid.map((cat, idx) => (
                    <div key={idx} className="recommended-gate">
                      <div className="gate-content">
                        <div className="gate-icon">
                          <img src={images[`../assets/icons/${cat}.svg`].default} alt={data[`${toCamelCase(cat).replace("-", "")}Name`]} />
                        </div>
                        <div className="gate-name">
                          <h3 className="text blg">
                            {data[`${toCamelCase(cat).replace("-", "")}Name`]}
                          </h3>
                        </div>
                        <div className="gate-score">
                          <h3 className="subtitle">
                            {Math.ceil(parseFloat(getHybridScorePercentage(hybridScores, cat)))}%
                          </h3>
                        </div>
                      </div>
                      {
                          quizType === "gen-cat" && (
                            <div className="gate-action">
                              <Link to={`/quiz/${cat}`}>
                                <button className={idx === 0 ? "main-btn" : "secondary-btn"}>{data.quizMeThis}</button>
                              </Link>
                            </div>
                          )
                       }
                    </div>
                  ))
                }
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Grid/List of Saved Quiz Results */}
      <section id="results-list">
        <h2 className="subtitle">
          {data.savedResultsTitle}
        </h2>
        <div id="results-grid">
          {savedResults.map((result, idx) => (
            <div
              key={idx}
              className={`result-item ${
                selectedResult &&
                selectedResult.quizType === result.quizType &&
                selectedResult.state.finished ? "active" : ""
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
                    // If the quiz is finished, display the "View Result" button.
                    <Link to={`/results/${result.quizType}`}>
                      <button className="secondary-btn">
                        {data.viewResult || "View Result"}
                      </button>
                    </Link>
                  ) : (
                    // If the quiz is not finished, display a "Continue Quiz" button.
                    <Link to={`/quiz/${result.quizType}`}>
                      <button className="secondary-btn">
                        {data.continueQuiz || "Continue Quiz"}
                      </button>
                    </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Explanation / Information */}
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
    </>
  );
};

export default Results;
