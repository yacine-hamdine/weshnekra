import { useState, useEffect } from "react";
import { fetchQuestions } from "../providers/QuizLoader"; // Fetch questions from Firestore or IndexedDB
import { db } from "../config/firebase"; // Firestore config

const useQuizLogic = (quizType, resultsGates) => {

  // Load saved state from LocalStorage at initialization
  const savedState = JSON.parse(localStorage.getItem(`quiz_state_${quizType}`)) || {};

  const [responses, setResponses] = useState(savedState.savedResponses || {});
  const [rawScores, setRawScores] = useState(
    savedState.savedScores ||
      resultsGates.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {})
  );
  const [normalizedScores, setNormalizedScores] = useState({});
  const [regulatedScores, setRegulatedScores] = useState({});
  const [hybridScores, setHybridScores] = useState({});
  const [currentIndex, setCurrentIndex] = useState(savedState.savedIndex || 0);
  const [questions, setQuestions] = useState([]);

  // Fetch questions from Firestore or IndexedDB
  useEffect(() => {
    if (!quizType) {
      console.error("useQuizLogic: quizType is required but missing!");
      return;
    }
    fetchQuestions(db, quizType)
      .then(setQuestions)
      .catch((err) => console.error("Error fetching questions:", err));
  }, [quizType]);

  // Save quiz state whenever responses or scores change
  useEffect(() => {
    localStorage.setItem(
      `quiz_state_${quizType}`,
      JSON.stringify({
        savedResponses: responses,
        savedRawScores: rawScores,
        savedNormalizedScores: normalizedScores,
        savedRegulatedScores: regulatedScores,
        savedHybridScores: hybridScores,
        savedIndex: currentIndex
      })
    );
  }, [responses, hybridScores, currentIndex, quizType]);

  // Normalization: scale rawScores to a 0-100 range based on current min and max across categories
  const normalizeScores = (scores) => {
    const values = Object.values(scores);
    const minScore = Math.min(...values);
    const maxScore = Math.max(...values);

    if (maxScore === minScore) {
      // Avoid division by zero; set all to a neutral value (50)
      return resultsGates.reduce((acc, cat) => ({ ...acc, [cat]: 50 }), {});
    }

    const normalized = {};
    resultsGates.forEach((cat) => {
      normalized[cat] = ((scores[cat] - minScore) / (maxScore - minScore)) * 100;
    });
    return normalized;
  };

  // Update normalized scores whenever rawScores change
  useEffect(() => {
    setNormalizedScores(normalizeScores(rawScores));
  }, [rawScores]);

  // Calculate the maximum possible score per category based on questions.
  // For each question, if the weight for a category is positive, add (weight * 5) to that category's maximum.
  const computeMaxPossible = () => {
    const maxPossible = {};
    resultsGates.forEach((cat) => (maxPossible[cat] = 0));
    questions.forEach((question) => {
      // Assuming each question has a "weights" field
      if (question.weights) {
        Object.entries(question.weights).forEach(([cat, weight]) => {
          if (weight > 0) {
            maxPossible[cat] += weight * 5; // 5 is the max answer value per question
          }
        });
      }
    });
    return maxPossible;
  };

  // Update regulated scores whenever rawScores or questions change
  useEffect(() => {
    if (questions.length > 0) {
      const maxPossible = computeMaxPossible();
      const newRegulated = {};
      resultsGates.forEach((cat) => {
        // If no positive weight, set regulated score to 0
        if (maxPossible[cat] > 0) {
          // Calculate regulated score (capped at 100)
          newRegulated[cat] = Math.min((rawScores[cat] / maxPossible[cat]) * 100, 100);
        } else {
          newRegulated[cat] = 0;
        }
      });
      setRegulatedScores(newRegulated);
    }
  }, [rawScores, questions]);

  // Compute a hybrid score as a weighted average of normalized and regulated scores.
  // alpha is a parameter (0 <= alpha <= 1). For example, alpha=0.5 gives equal weight.
  useEffect(() => {
    const alpha = 0.5; // Adjust as needed
    const newHybrid = {};
    resultsGates.forEach((cat) => {
      const norm = normalizedScores[cat] !== undefined ? normalizedScores[cat] : 0;
      const reg = regulatedScores[cat] !== undefined ? regulatedScores[cat] : 0;
      newHybrid[cat] = alpha * norm + (1 - alpha) * reg;
    });
    setHybridScores(newHybrid);
  }, [normalizedScores, regulatedScores]);

  // Handle slider change and update rawScores accordingly.
  // weights is an object mapping category names to their respective weight for that question.
  const handleSliderChange = (questionId, value, weights) => {
    // Retrieve previous answer for this question (default to 0 if none)
    const previousValue = responses[questionId] || 0;
    // Update the responses with the new value
    setResponses((prev) => ({
      ...prev,
      [questionId]: value
    }));
  
    // Calculate the change (delta) in the answer value
    const delta = value - previousValue;
  
    // Update rawScores by adding the delta multiplied by the weight
    setRawScores((prevScores) => {
      const newScores = { ...prevScores };
      Object.entries(weights).forEach(([category, weight]) => {
        newScores[category] += delta * weight;
      });
      return newScores;
    });
  };  

  return [
    questions,
    responses,
    rawScores,
    normalizedScores,
    regulatedScores,
    hybridScores,
    currentIndex,
    handleSliderChange,
    setCurrentIndex,
    resultsGates,
    setRawScores,
    setResponses
  ];
};

export default useQuizLogic;