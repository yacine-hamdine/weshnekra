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
    fetchQuestions(db, quizType).then(setQuestions);
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

  return (
    <div>
      <h2>Quiz</h2>
      {questions.length > 0 ? (
        <div key={questions[currentIndex].id}>
          <p>{questions[currentIndex].en}</p>
          <input
            type="range"
            min="0"
            max="5"
            value={responses[questions[currentIndex].id] || 0}
            onChange={(e) => handleSliderChange(questions[currentIndex].id, Number(e.target.value), questions[currentIndex].weights)}
          />
        </div>
      ) : (
        <p>Loading questions...</p>
      )}

      {/* Navigation */}
      <button
        disabled={currentIndex === 0}
        onClick={() => setCurrentIndex((prev) => prev - 1)}
      >
        Previous
      </button>
      <button
        disabled={currentIndex === questions.length - 1}
        onClick={() => setCurrentIndex((prev) => prev + 1)}
      >
        Next
      </button>

      <button onClick={() => console.log("Final Scores:", scores)}>See Results</button>
    </div>
  );
};

export default useQuizLogic;
