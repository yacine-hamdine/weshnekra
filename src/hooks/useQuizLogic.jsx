import { useState, useEffect } from "react";
import { fetchQuestions } from "../providers/QuizLoader"; // Fetch questions from Firestore or IndexedDB
import { db } from "../config/firebase"; // Firestore config

const useQuizLogic = (quizType, resultsGates) => {
  // Load saved state from LocalStorage at initialization (only base state)
  const savedState = JSON.parse(localStorage.getItem(`quiz_state_${quizType}`)) || {};

  const [responses, setResponses] = useState(savedState.savedResponses || {});
  const [rawScores, setRawScores] = useState(
    savedState.savedRawScores ||
      resultsGates.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {})
  );
  const [currentIndex, setCurrentIndex] = useState(savedState.savedIndex || 0);
  const [questions, setQuestions] = useState([]);

  // Derived states (will be recalculated)
  const [normalizedScores, setNormalizedScores] = useState({});
  const [regulatedScores, setRegulatedScores] = useState({});
  const [hybridScores, setHybridScores] = useState({});

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

  // Save base quiz state (responses, rawScores, currentIndex) to localStorage
  useEffect(() => {
    localStorage.setItem(
      `quiz_state_${quizType}`,
      JSON.stringify({
        savedResponses: responses,
        savedRawScores: rawScores,
        savedIndex: currentIndex
      })
    );
  }, [responses, rawScores, currentIndex, quizType]);

  // Normalization: scale rawScores to a 0-100 range based on current min and max
  const normalizeScores = (scores) => {
    const values = Object.values(scores);
    const minScore = Math.min(...values);
    const maxScore = Math.max(...values);

    if (maxScore === minScore) {
      return resultsGates.reduce((acc, cat) => ({ ...acc, [cat]: 50 }), {});
    }

    const normalized = {};
    resultsGates.forEach((cat) => {
      normalized[cat] = ((scores[cat] - minScore) / (maxScore - minScore)) * 100;
    });
    return normalized;
  };

  // Recalculate normalized scores when rawScores change
  useEffect(() => {
    setNormalizedScores(normalizeScores(rawScores));
  }, [rawScores]);

  // Compute maximum possible score per category based on questions
  const computeMaxPossible = () => {
    const maxPossible = {};
    resultsGates.forEach((cat) => (maxPossible[cat] = 0));
    questions.forEach((question) => {
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

  // Recalculate regulated scores when rawScores or questions change
  useEffect(() => {
    if (questions.length > 0) {
      const maxPossible = computeMaxPossible();
      const newRegulated = {};
      resultsGates.forEach((cat) => {
        if (maxPossible[cat] > 0) {
          newRegulated[cat] = Math.min((rawScores[cat] / maxPossible[cat]) * 100, 100);
        } else {
          newRegulated[cat] = 0;
        }
      });
      setRegulatedScores(newRegulated);
    }
  }, [rawScores, questions]);

  // Compute hybrid score as a weighted average (using alpha, e.g., 0.5)
  useEffect(() => {
    const alpha = 0.5; // Adjust alpha as needed (or even 0.7)
    const newHybrid = {};
    resultsGates.forEach((cat) => {
      const norm = normalizedScores[cat] !== undefined ? normalizedScores[cat] : 0;
      const reg = regulatedScores[cat] !== undefined ? regulatedScores[cat] : 0;
      newHybrid[cat] = alpha * norm + (1 - alpha) * reg;
    });
    setHybridScores(newHybrid);
  }, [normalizedScores, regulatedScores]);

  // Handle slider change: update base state (responses and rawScores)
  const handleSliderChange = (questionId, value, weights) => {
    const previousValue = responses[questionId] || 0;
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    const delta = value - previousValue;
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
