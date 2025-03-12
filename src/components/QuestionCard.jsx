import {useState} from "react";
import { useLanguage } from "../contexts/language"; // Import the context

const QuestionCard = ({ questionContent , key }) => {

    const { translations } = useLanguage();
    const data = translations;

    const [inputValue, setInputValue] = useState(0);

    return (
        <div className="quiz-card">
            <div className="quiz-card-question">
                <div className="quiz-card-question-content subtitle">
                    {questionContent}
                </div>
                <div className="quiz-card-question-value">
                    <span id="input-value">
                        {inputValue}
                    </span>
                </div>
                <div className="quiz-card-question-input">
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                </div>
                <div className="quiz-card-question-data text">
                    <div className="quiz-card-question-data-min">
                        <span>0</span>
                        <span>{data.disagree}</span>
                    </div>
                    <div className="quiz-card-question-data-min">
                        <span>5</span>
                        <span>{data.agree}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;