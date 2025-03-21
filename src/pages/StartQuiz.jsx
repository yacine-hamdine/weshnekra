import React, { useState } from "react";
import { useLanguage } from "../contexts/language";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import QuizContent from "../components/QuizContent";
import QuizHeader from "../components/QuizHeader";
import QuizProgress from "../components/QuizProgress";
import QuizControls from "../components/QuizControls";
import useQuizLogic from "../hooks/useQuizLogic";

const StartQuiz = () => {
  const { quizType } = useParams();
  const { language, translations, loading } = useLanguage();
  const data = translations;

  // Example resultsGates instance
  const resultsGatesInstance = [
    "xct-sci",
    "ecn-bsn",
    "lng-lit",
    "spr-sci",
    "hmn-sci",
    "lth-sci",
    "arc-dsg"
  ];

  const [
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
  ] = useQuizLogic(quizType, resultsGatesInstance);

  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const handleFinishQuiz = () => {
    const finalState = {
      savedResponses: responses,
      savedRawScores: rawScores,
      savedIndex: currentIndex,
      savedSize: questions.length,
      savedNormalizedScores: normalizedScores,
      savedRegulatedScores: regulatedScores,
      savedHybridScores: hybridScores,
      finished: true
    };

    localStorage.setItem(`quiz_state_${quizType}`, JSON.stringify(finalState));
    navigate(`/results/${quizType}`);
  };

  if (loading) return <Loading />;

  return (
    <>
      <QuizHeader quizType={quizType} data={data} />
      <QuizProgress currentIndex={currentIndex} totalQuestions={questions.length} data={data}/>
      <div className="quiz-widget">
        <QuizContent
          questions={questions}
          language={language}
          currentIndex={currentIndex}
          direction={direction}
          handleSliderChange={handleSliderChange}
          responses={responses}
          colors={["#ff0000", "#ff5500", "#ffaa00", "#cbcb00", "#88d100", "#00ff00"]}
          data={data}
        />
        <QuizControls
          currentIndex={currentIndex}
          questions={questions}
          setCurrentIndex={setCurrentIndex}
          handleFinishQuiz={handleFinishQuiz}
          setResponses={setResponses}
          setRawScores={setRawScores}
          resultsGates={resultsGates}
          quizType={quizType}
          data={data}
          setDirection={setDirection}
        />
      </div>
    </>
  );
};

export default StartQuiz;