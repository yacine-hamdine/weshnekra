import { useState, useEffect } from "react";
import { fetchQuestions } from "../providers/QuizLoader"; // Fetch questions from Firestore or IndexedDB
import { db } from "../config/firebase"; // Firestore config

const categories = [
  "xct-sci",
  "ecn-bsn",
  "lng-lit",
  "spr-sci",
  "hmn-sci",
  "lth-sci",
  "arc-dsg"
];

const useQuizLogic = ({ quizType }) => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [scores, setScores] = useState(categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}));
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question

  // Load quiz state from LocalStorage
  useEffect(() => {
    const savedState = localStorage.getItem(`quiz_state_${quizType}`);
    if (savedState) {
      const { savedResponses, savedScores, savedIndex } = JSON.parse(savedState);
      setResponses(savedResponses);
      setScores(savedScores);
      setCurrentIndex(savedIndex);
    }
  }, [quizType]);

  // Fetch questions from Firestore or IndexedDB
  useEffect(() => {
    // fetchQuestions(db, quizType).then(setQuestions);
    setQuestions([
      {
        "id": "Q1",
        "en": "I enjoy solving complex problems.",
        "fr": "J’aime résoudre des problèmes complexes.",
        "ar": "أحب حل المشكلات المعقدة",
        "weights": {
          "ecn-bsn": 1,
          "lng-lit": -1,
          "spr-sci": -1,
          "xct-sci": 1
        }
      },
      {
        "id": "Q2",
        "en": "I prefer working in a team and being on the move.",
        "fr": "Je préfère travailler en équipe et être en mouvement.",
        "ar": "أفضل العمل في فريق وأن أكون في حركة.",
        "weights": {
          "arc-dsg": -1,
          "lng-lit": -1,
          "hmn-sci": 1,
          "lth-sci": 1,
          "spr-sci": 1,
          "xct-sci": -1
        }
      },
      {
        "id": "Q3",
        "en": "I read novels or like to write.",
        "fr": "Je lis des romans ou aime écrire.",
        "ar": "أقرأ الروايات أو أحب الكتابة.",
        "weights": {
          "ecn-bsn": -1,
          "lng-lit": 1,
          "hmn-sci": 1,
          "spr-sci": -1
        }
      }
    ])
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

    console.log(value)

    setScores((prevScores) => {
      const newScores = { ...prevScores };
      Object.entries(weights).forEach(([category, weight]) => {
        newScores[category] += value * weight;
      });
      return newScores;
    });
  };

  return [questions, responses, scores, currentIndex, handleSliderChange, setCurrentIndex];
};

export default useQuizLogic;