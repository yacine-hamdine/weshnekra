import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language"; // Import the context
import { Link } from "react-router-dom";

function Footer() {

    const { language, loadLanguage, translations } = useContext(LanguageContext);
    const data = translations;

    return (
       <footer>
        <div id="credits">
          <p>
            <span className="subtitle">
              {data.credits}
            </span>
            <br />
            <span className="text">
              {data.creditsText}
            </span>
          </p>
        </div>
        <div id="infos">

        </div>
       </footer> 
    )
}

export default Footer