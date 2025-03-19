import { useLanguage } from "../contexts/language"; // Import the context
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useQuizLogic from "../hooks/useQuizLogic";
import PreviousIcon from "../assets/icons/previous.svg";
import NextIcon from "../assets/icons/next.svg";
import RestartIcon from "../assets/icons/restart.svg";


const StartQuiz = () => {

    const { quizType } = useParams(); // Retrieve the quizType param if provided
    const { language, translations, loading } = useLanguage();
    const data = translations;

    // Quiz Logic Hook
    const resultsGatesInstance = ["xct-sci", "ecn-bsn", "lng-lit", "spr-sci", "hmn-sci", "lth-sci", "arc-dsg"];

    const [questions, responses, rawScores, normalizedScores, regulatedScores, hybridScores, currentIndex, handleSliderChange, setCurrentIndex, resultsGates  , setRawScores, setResponses] = useQuizLogic(quizType, resultsGatesInstance);
    
    const colors = ["#ff0000", "#ff5500", "#ffaa00", "#cbcb00", "#88d100", "#00ff00"];

    const navigate = useNavigate();

    const handleFinishQuiz = () => {
      // Prepare the final state
      const finalState = {
        savedResponses: responses,
        savedRawScores: rawScores,
        savedIndex: currentIndex,
        savedSize: questions.length,
        savedNormalizedScores: normalizedScores,
        savedRegulatedScores: regulatedScores,
        savedHybridScores: hybridScores,
        finished: true, // Mark the quiz as finished
      };
  
      // Save final state in localStorage
      localStorage.setItem(`quiz_state_${quizType}`, JSON.stringify(finalState));
  
      // Navigate to the results page
      navigate(`/results/${quizType}`);
    };

    if (loading) return <Loading />;

    return (
      <>
        <div className="quiz-title title">
          {data.genCatName}
        </div>

        <div className="quiz-progress">
            <div className="quiz-progress-content">
                <div className="quiz-progress-title text">
                    {data.progress}
                </div>
                <div className="quiz-progress-index text">
                    <span>{currentIndex + 1}</span>/<span>{questions.length}</span>
                </div>
            </div>
            <div className="quiz-progress-bar-container">
              <motion.div
                className="progress-bar"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentIndex + 1) * 100 / questions.length}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  height: "10px",
                  backgroundColor: "#000000",
                  borderRadius: "5px",
                }}
              />
            </div>
            {/* <progress value={currentIndex + 1} max={questions.length} className="quiz-progress-bar"></progress> */}
        </div>

        <div className="quiz-widget">

          <div className="quiz-content">
            
            {questions.length > 0 ? (
              <div className="quiz-card-question" key={questions[currentIndex].id}>
                <div className="quiz-card-question-content subtitle">
                    {questions[currentIndex][language]}
                </div>
                <div className="quiz-card-question-value">
                    <span className="input-value-box" style={{ backgroundColor: `${colors[responses[questions[currentIndex].id] || 0]}35` }}>
                        <b className="input-value-content" style={{ color: `${colors[responses[questions[currentIndex].id] || 0]}` }}>
                          {responses[questions[currentIndex].id] || 0}
                        </b>
                    </span>
                </div>
                <div className="quiz-card-question-input">
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={responses[questions[currentIndex].id] || 0}
                        onChange={(e) => handleSliderChange(questions[currentIndex].id, Number(e.target.value), questions[currentIndex].weights)}
                        className="input-slider"
                    />

                </div>
                <div className="quiz-card-question-data text">
                    <div className="quiz-card-question-data-min">
                        <span className="quiz-card-question-data-min-num" style={{ color: colors[0] }}>0</span>
                        <br />
                        <span className="quiz-card-question-data-min-text">{data.disagree}</span>
                    </div>
                    <div className="quiz-card-question-data-min">
                        <span className="quiz-card-question-data-min-num" style={{ color: colors[5] }}>5</span>
                        <br />
                        <span className="quiz-card-question-data-min-text">{data.agree}</span>
                    </div>
                </div>
              </div>
            ) : (
              <Loading />
            )}

          </div>

          <div className="quiz-controls">
          <div className="quiz-previous">
              <button className="secondary-ctrl ctrl-btn"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                >
                <span className="ctrl-btn-icon">
                  <img src={PreviousIcon} alt="previous" />
                </span>
                <span className="ctrl-btn-text">
                  {data.quizPrevious}
                </span>
              </button>
            </div>
            <div className="quiz-restart">
              <button className="arbitrary-ctrl ctrl-btn"
                onClick={() => {
                  setCurrentIndex(0);
                  setResponses({});
                  setRawScores(resultsGates.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}) );
                  localStorage.removeItem(`quiz_state_${quizType}`);
                }}
                >
                <span className="ctrl-btn-icon">
                  <img src={RestartIcon} alt="restart" />
                </span>
                <span className="ctrl-btn-text">
                  {data.quizRestart}
                </span>
              </button>
            </div>
            {currentIndex === questions.length - 1 ? (
              <motion.button
                className="main-btn"
                onClick={handleFinishQuiz}
                initial={{ opacity: 0, x: 50 }} // Start off-screen to the right
                animate={{ opacity: 1, x: 0 }} // Slide in to its position
                transition={{
                  type: "spring", // Bouncy effect
                  stiffness: 120, // Controls the bounce
                  damping: 10, // Controls how much it slows down
                }}
              >
                {data.finishQuiz}
              </motion.button>
            ) : (
              <div className="quiz-next">
                <button
                  className="main-ctrl ctrl-btn"
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                  <span className="ctrl-btn-text" style={{ color: "white" }}>
                    {data.quizNext}
                  </span>
                  <span className="ctrl-btn-icon">
                    <img src={NextIcon} alt="next" />
                  </span>
                </button>
              </div>
            )}
            {/* { currentIndex === questions.length - 1 ? 
                (
                  <button className="main-btn" onClick={handleFinishQuiz}>
                    {data.finishQuiz}
                  </button>
                )
                :
                 (
                  <div className="quiz-next">
                    <button className="main-ctrl ctrl-btn"
                      disabled={currentIndex === questions.length - 1}
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      >
                      <span className="ctrl-btn-text" style={{ color: "white" }}>
                        {data.quizNext}
                      </span>
                      <span className="ctrl-btn-icon">
                        <img src={NextIcon} alt="next" />
                      </span>
                    </button>
                  </div>
                )
            } */}
          </div>

        </div>
      </>
    )

}

export default StartQuiz