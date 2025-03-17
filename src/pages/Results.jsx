import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../contexts/language"; // Language context
import Loading from "../components/Loading";
import ScoreChart from "../components/ScoreChart";
import "../styles/results.css";
import CalculationIcon from "../assets/icons/calculation.svg";
import InterpretationIcon from "../assets/icons/chart.svg";
import UsageIcon from "../assets/icons/research.svg";


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
  const rawScores = selectedResult?.state.savedRawScores || {};
  const normalizedScores = selectedResult?.state.savedNormalizedScores || {};
  const regulatedScores = selectedResult?.state.savedRegulatedScores || {};
  const hybridScores = selectedResult?.state.savedHybridScores || {};

  // Compute top 3 recommendations (sorted descending by score)
  const top3Raw = Object.keys(rawScores)
    .sort((a, b) => rawScores[b] - rawScores[a])
    .slice(0, 3);

  const top3Normalized = Object.keys(normalizedScores)
    .sort((a, b) => normalizedScores[b] - normalizedScores[a])
    .slice(0, 3);

  const top3Regulated = Object.keys(regulatedScores)
    .sort((a, b) => regulatedScores[b] - regulatedScores[a])
    .slice(0, 3);

  const top3Hybrid = Object.keys(hybridScores)
    .sort((a, b) => hybridScores[b] - hybridScores[a])
    .slice(0, 3);

  const allKeys = [
    ...new Set([
      ...Object.keys(rawScores),
      ...Object.keys(normalizedScores),
      ...Object.keys(regulatedScores),
      ...Object.keys(hybridScores),
    ]),
  ];
    
  // Transform scores into an array of objects for Recharts
  const chartData = allKeys.map((key) => ({
    resultGate: key,
    score1: rawScores[key] || 0,
    score2: normalizedScores[key] || 0,
    score3: regulatedScores[key] || 0,
    score4: hybridScores[key] || 0,
  }));

  return (
    <>
      {/* Section 1: Header */}
      <section id="results-header">
        <h1 className="title">{data.results}</h1>
      </section>

      {/* Section 2: Selected Result Display */}
      {selectedResult && (
        <section id="selected-result">
          <ScoreChart data={chartData} />
          <div className="result-recommendation">
            <h3>{data.recommendedPath || "Recommended Categories 1:"}</h3>
            <ul>
              {top3Raw.map((cat, idx) => (
                <li key={idx}>{cat}</li>
              ))}
            </ul>
            <h3>{data.recommendedPath || "Recommended Categories 2:"}</h3>
            <ul>
              {top3Normalized.map((cat, idx) => (
                <li key={idx}>{cat}</li>
              ))}
            </ul>
            <h3>{data.recommendedPath || "Recommended Categories 3:"}</h3>
            <ul>
              {top3Regulated.map((cat, idx) => (
                <li key={idx}>{cat}</li>
              ))}
            </ul>
            <h3>{data.recommendedPath || "Recommended Categories 4:"}</h3>
            <ul>
              {top3Hybrid.map((cat, idx) => (
                <li key={idx}>{cat}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Section 3: Grid/List of Saved Quiz Results */}
      <section id="results-list">
        <h2 className="subtitle">
          {data.savedResultsTitle}
        </h2>
        <div className="results-grid">
          {savedResults.map((result, idx) => (
            <div
              key={idx}
              className={`result-item ${
                selectedResult &&
                selectedResult.quizType === result.quizType ? "active" : ""
              }`}
              onClick={() => setSelectedResult(result)}
            >
              <p>{result.quizType}</p>
              {/* Optionally display a quick summary of the scores */}
              <ul>
                {Object.entries(result.state.savedScores || {}).map(
                  ([cat, score]) => (
                    <li key={cat}>
                      {cat}: {score}
                    </li>
                  )
                )}
              </ul>
              <button className="main-btn">{data.viewResult || "View Result"}</button>
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
