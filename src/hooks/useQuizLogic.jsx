import { useState, useEffect } from "react";
import { fetchQuestions } from "../providers/QuizLoader"; // Fetch questions from Firestore or IndexedDB
import { db } from "../config/firebase"; // Firestore config

const useQuizLogic = (quizType) => {
  // Load saved state from LocalStorage at initialization (only base state)
  const savedState = JSON.parse(localStorage.getItem(`quiz_state_${quizType}`)) || {};

  const [questions, setQuestions] = useState([]);
  const [resultsGates, setResultsGates] = useState([]);
  const [responses, setResponses] = useState(savedState.savedResponses || {});
  const [rawScores, setRawScores] = useState(savedState.savedRawScores || {});
  const [currentIndex, setCurrentIndex] = useState(savedState.savedIndex || 0);

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
      .then((fetchedQuestions) => {
        setQuestions(fetchedQuestions);
        // Extract resultsGates from the first question's weights (if available)
        const gates = fetchedQuestions[0]?.weights ? Object.keys(fetchedQuestions[0].weights) : [];
        setResultsGates(gates);
        // If no saved responses, initialize responses with a default value of 1 for each question
        if (!savedState.savedResponses) {
          const initResponses = fetchedQuestions.reduce((acc, q) => ({ ...acc, [q.id]: 1 }), {});
          setResponses(initResponses);
        }
        // If no saved rawScores, initialize rawScores with zeros for each gate
        if (!savedState.savedRawScores) {
          const initRawScores = {};
          gates.forEach((cat) => { initRawScores[cat] = 0; });
          setRawScores(initRawScores);
        }
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, [quizType]);

  // Save base quiz state (responses, rawScores, currentIndex) to localStorage
  useEffect(() => {
    localStorage.setItem(
      `quiz_state_${quizType}`,
      JSON.stringify({
        savedResponses: responses,
        savedRawScores: rawScores,
        savedIndex: currentIndex,
        savedSize: questions.length,
      })
    );
  }, [responses, rawScores, currentIndex, quizType, questions]);

  // Normalization: scale rawScores to a 0-100 range based on current min and max
  const normalizeScores = (scores) => {
    const values = Object.values(scores);
    const minScore = Math.min(...values);
    const maxScore = Math.max(...values);
    if (maxScore === minScore) {
      // If all scores are equal, return a neutral value (50) for each gate
      const neutral = {};
      resultsGates.forEach((cat) => { neutral[cat] = 50; });
      return neutral;
    }
    const normalized = {};
    resultsGates.forEach((cat) => {
      normalized[cat] = ((scores[cat] - minScore) / (maxScore - minScore)) * 100;
    });
    return normalized;
  };

  useEffect(() => {
    setNormalizedScores(normalizeScores(rawScores));
  }, [rawScores, resultsGates]);

  // Compute maximum possible score per category based on questions
  const computeMaxPossible = () => {
    const maxPossible = {};
    resultsGates.forEach((cat) => { maxPossible[cat] = 0; });
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

  // Recalculate regulated scores when rawScores, questions or resultsGates change
  useEffect(() => {
    if (questions.length > 0 && resultsGates.length > 0) {
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
  }, [rawScores, questions, resultsGates]);

  // Compute hybrid score as a weighted average using alpha = 0.3
  useEffect(() => {
    if (resultsGates.length > 0) {
      const alpha = 0.3;
      const newHybrid = {};
      resultsGates.forEach((cat) => {
        const norm = normalizedScores[cat] !== undefined ? normalizedScores[cat] : 0;
        const reg = regulatedScores[cat] !== undefined ? regulatedScores[cat] : 0;
        newHybrid[cat] = alpha * norm + (1 - alpha) * reg;
      });
      setHybridScores(newHybrid);
    }
  }, [normalizedScores, regulatedScores, resultsGates]);

  // Handle slider change: update responses and rawScores
  const handleSliderChange = (questionId, value, weights) => {
    const previousValue = responses[questionId] || 1;
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    const delta = value - previousValue;
    setRawScores((prevScores) => {
      const newScores = { ...prevScores };
      Object.entries(weights || {}).forEach(([category, weight]) => {
        if (newScores[category] === undefined) newScores[category] = 0;
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
    setResponses,
  ];
};

export default useQuizLogic;