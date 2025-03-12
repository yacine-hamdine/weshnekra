import React from "react";
import { useLanguage } from "../contexts/language"; // Import the context
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import "../styles/home.css";
import HeroImg from "../assets/images/hero.svg";
import QuizIcon from "../assets/icons/quiz.svg";
import RecommendationsIcon from "../assets/icons/spkl.svg";
import EducationIcon from "../assets/icons/educ.svg";

const Home = () => {

  const { translations, loading } = useLanguage();
  const data = translations;

  if (loading) return <Loading />;

  return (
    <>
      <section id="hero">
        <div id="hero-image">
          <img src={HeroImg} alt="Hero Image" />
        </div>
        <div id="hero-content">
          <div id="hero-title">
            <h1 className="title">
              {data.heroTitle}
            </h1>
          </div>
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
      </section>
      <section id="explore">
        <div id="explore-title">
          <h2 className="title">
            {data.exploreTitle}
          </h2>
        </div>
        <div id="explore-content">
          <div id="explore-text">
            {data.exploreText}
          </div>
          <div id="explore-cards">
            <div id="card1">
              <div>
                <img src={QuizIcon} alt="Quiz" />
              </div>  
              <div>
                <h3 className="subtitle">
                  {data.feature1Title}
                </h3>
              </div>
              <div>
                <p className="text">
                  {data.feature1Text}
                </p>
              </div>
            </div>
            <div id="card2">
              <div>
                <img src={RecommendationsIcon} alt="Recommendations" />
              </div>
              <div>
                <h3 className="subtitle">
                  {data.feature2Title}
                </h3>
              </div>
              <div>
                <p className="text">
                  {data.feature2Text}
                </p>
              </div>
            </div>
            <div id="card3">
            <div>
                <img src={EducationIcon} alt="Education" />
              </div>
              <div>
                <h3 className="subtitle">
                  {data.feature3Title}
                </h3>
              </div>
              <div>
                <p className="text">
                  {data.feature3Text}
                </p>
              </div>
            </div>
          </div>
          <div id="explore-btns">
            <Link to={"/quiz/start"}>
              <button className="secondary-btn">
                {data.startQuiz}
              </button>
            </Link>
            <Link to={"/quiz"}>
              <span className="link">
                {data.knowMore}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home