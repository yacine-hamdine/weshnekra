import { useState, useEffect } from "react";
import { fetchQuestions } from "../providers/QuizLoader"; // Fetch questions from Firestore or IndexedDB
import { db } from "../config/firebase"; // Firestore config

const useQuizLogic = (quizType) => {
  const categories = [
    "xct-sci",
    "ecn-bsn",
    "lng-lit",
    "spr-sci",
    "hmn-sci",
    "lth-sci",
    "arc-dsg"
  ];

  // Load saved state from LocalStorage at initialization
  const savedState = JSON.parse(localStorage.getItem(`quiz_state_${quizType}`)) || {};

  const [responses, setResponses] = useState(savedState.savedResponses || {});
  const [rawScores, setRawScores] = useState(savedState.savedScores || categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}));
  const [normalizedScores, setNormalizedScores] = useState({});
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

  // Save quiz state whenever responses change
  useEffect(() => {
    localStorage.setItem(
      `quiz_state_${quizType}`,
      JSON.stringify({ savedResponses: responses, savedScores: rawScores, savedIndex: currentIndex })
    );
  }, [responses, rawScores, currentIndex, quizType]);

  // Function to normalize scores
  const normalizeScores = (scores) => {
    const values = Object.values(scores);
    const minScore = Math.min(...values);
    const maxScore = Math.max(...values);

    if (maxScore === minScore) {
      // Avoid division by zero; set all to 50 (neutral)
      return categories.reduce((acc, cat) => ({ ...acc, [cat]: 50 }), {});
    }

    const normalized = {};
    for (const cat of categories) {
      normalized[cat] = ((scores[cat] - minScore) / (maxScore - minScore)) * 100;
    }

    return normalized;
  };

  // Apply normalization whenever rawScores change
  useEffect(() => {
    setNormalizedScores(normalizeScores(rawScores));
  }, [rawScores]);

  const handleSliderChange = (questionId, value, weights) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value
    }));

    console.log(rawScores)

    setRawScores((prevScores) => {
      const newScores = { ...prevScores };
      Object.entries(weights).forEach(([category, weight]) => {
        newScores[category] += value * weight;
      });
      return newScores;
    });
  };

  return [questions, responses, rawScores, normalizedScores, currentIndex, handleSliderChange, setCurrentIndex, categories, setRawScores, setResponses];
};

export default useQuizLogic;










// import { useState, useEffect } from "react";
// import { fetchQuestions } from "../providers/QuizLoader"; // Fetch questions from Firestore or IndexedDB
// import { db } from "../config/firebase"; // Firestore config


// const useQuizLogic = (quizType) => {
//   const categories = [
//     "xct-sci",
//     "ecn-bsn",
//     "lng-lit",
//     "spr-sci",
//     "hmn-sci",
//     "lth-sci",
//     "arc-dsg"
//   ];

//   // Load saved state from LocalStorage at initialization
//   const savedState = JSON.parse(localStorage.getItem(`quiz_state_${quizType}`)) || {};

//   const [responses, setResponses] = useState(savedState.savedResponses || {});
//   const [scores, setScores] = useState(savedState.savedScores || categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}));
//   const [currentIndex, setCurrentIndex] = useState(savedState.savedIndex || 0);
//   const [questions, setQuestions] = useState([]);

//   // Fetch questions from Firestore or IndexedDB
//   useEffect(() => {
//     if (!quizType) {
//       console.error("useQuizLogic: quizType is required but missing!");
//       return;
//     }
//     fetchQuestions(db, quizType)
//       .then(setQuestions)
//       .catch((err) => console.error("Error fetching questions:", err));
//   }, [quizType]);

//   // Save quiz state whenever responses change
//   useEffect(() => {
//     localStorage.setItem(
//       `quiz_state_${quizType}`,
//       JSON.stringify({ savedResponses: responses, savedScores: scores, savedIndex: currentIndex })
//     );
//   }, [responses, scores, currentIndex, quizType]);

//   const handleSliderChange = (questionId, value, weights) => {
//     setResponses((prev) => ({
//       ...prev,
//       [questionId]: value
//     }));

//     setScores((prevScores) => {
//       const newScores = { ...prevScores };
//       Object.entries(weights).forEach(([category, weight]) => {
//         newScores[category] += value * weight;
//       });
//       return newScores;
//     });
//   };

//   return [questions, responses, scores, currentIndex, handleSliderChange, setCurrentIndex, categories, setScores, setResponses];
// };

// export default useQuizLogic;