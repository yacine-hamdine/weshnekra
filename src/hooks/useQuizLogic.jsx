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
  const [scores, setScores] = useState(savedState.savedScores || categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}));
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
      JSON.stringify({ savedResponses: responses, savedScores: scores, savedIndex: currentIndex })
    );
  }, [responses, scores, currentIndex, quizType]);

  const handleSliderChange = (questionId, value, weights) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value
    }));

    setScores((prevScores) => {
      const newScores = { ...prevScores };
      Object.entries(weights).forEach(([category, weight]) => {
        newScores[category] += value * weight;
      });
      return newScores;
    });
  };

  return [questions, responses, scores, currentIndex, handleSliderChange, setCurrentIndex, categories, setScores, setResponses];
};

export default useQuizLogic;






























// const categories = [
//   "xct-sci",
//   "ecn-bsn",
//   "lng-lit",
//   "spr-sci",
//   "hmn-sci",
//   "lth-sci",
//   "arc-dsg"
// ];

// const useQuizLogic = (quizType) => {
//   const [questions, setQuestions] = useState([]);
//   const [responses, setResponses] = useState({});
//   const [scores, setScores] = useState(categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}));
//   const [currentIndex, setCurrentIndex] = useState(0); // Track the current question

//   // Load quiz state from LocalStorage
//   useEffect(() => {
//     const savedState = localStorage.getItem(`quiz_state_${quizType}`);
//     if (savedState) {
//       const { savedResponses, savedScores, savedIndex } = JSON.parse(savedState);
//       setResponses(savedResponses);
//       setScores(savedScores);
//       setCurrentIndex(savedIndex);
//     }
//   }, [quizType]);

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

//     console.log(scores);

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