import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language"; // Import the context
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {

  const { language, loadLanguage, translations } = useContext(LanguageContext);
  const data = translations;

  return (
    <div id="hero">
      <div id="hero-title">
        <h1 className="title">
          {data.heroTitle}
        </h1>
      </div>
      <div id="hero-content">
        <div id="hero-text">
          {data.heroText}
        </div>
        <div id="cta-btns">
          <Link to={"/quiz/start"}>
            <button className="main-btn">
              {data.startQuiz}
            </button>
          </Link>
          <Link to={"/quiz/special"}>
            <button className="secondary-btn">
              {data.specialQuiz}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home