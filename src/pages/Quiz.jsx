import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language"; // Import the context
import { Link, Outlet } from "react-router-dom";
const Quiz = () => {

  const { translations } = useContext(LanguageContext);
  const data = translations;
  

  return (
    <>
      <div id="quiz-presentation">
        <h2 className="title">{data.quiz}</h2>
        <p>{data.quizText}</p>
      </div>
      <Outlet/>
    </>
  )
}

/* 
  Exact Sciences : xct-sci
  Human & Social Sciences : hmn-sci
  Health Sciences : lth-sci
  Languages & Literature : lng-lit
  Economics & Business : ecn-bsn
  Sports & Physical Sciences : spr-sci
  Architecture & Design : arc-dsg
*/

export default Quiz