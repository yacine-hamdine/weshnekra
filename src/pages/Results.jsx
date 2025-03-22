import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../contexts/language";
import Loading from "../components/Loading";
import ResultsHeader from "../components/ResultsHeader";
import ResultsChart from "../components/ResultsChart";
import ResultsGrid from "../components/ResultsGrid";
import ResultsFAQs from "../components/ResultsFAQs";
import "../styles/results.css";


const images = import.meta.glob("../assets/icons/*.svg", { eager: true });

const Results = () => {
  const { quizType } = useParams();
  const { translations, loading } = useLanguage();
  const data = translations;

  const [savedResults, setSavedResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  // Helper function: calculate percentage for a given hybrid score
  const getHybridScorePercentage = (hybridScores, gate) => {
    const total = Object.values(hybridScores).reduce((sum, score) => sum + score, 0);
    if (total === 0) return 0;
    const gateScore = hybridScores[gate] || 0;
    return (gateScore / total) * 100;
  };

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
      setSelectedResult(null);
    }
  }, [quizType]);

  if (loading) return <Loading />;

  // Extract hybrid scores from selected result (if finished)
  const hybridScores = selectedResult?.state.savedHybridScores || {};

  return (
    <>
      <ResultsHeader quizType={quizType} data={data} />
      {selectedResult?.state?.finished && (
        <ResultsChart
          hybridScores={hybridScores}
          data={data}
          quizType={quizType}
          images={images}
          getHybridScorePercentage={getHybridScorePercentage}
        />
      )}
      <ResultsGrid
        savedResults={savedResults}
        selectedResult={selectedResult}
        data={data}
        images={images}
        quizType={quizType}
      />
      <ResultsFAQs data={data} />
    </>
  );
};

export default Results;