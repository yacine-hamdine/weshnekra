import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language"; // Import the context
import { Link } from "react-router-dom";
import Menu from "../styles/menu.jsx";


function Header() {

    const { language, loadLanguage, translations } = useContext(LanguageContext);
    const data = translations;

    return (
        <header>
            <div id="hamburger">
                <svg className="icon" id="hmbgr" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
            </div>
            <div id="logo" className="subtitle">
                WeshNekra
            </div>
            <Menu />
            {/* <nav id="menu">
                 <Link to="/">
                   <span className="text link">
                        {data.home}
                    </span>
                </Link>
                <Link to="/quiz">
                    <span className="text link">
                        {data.quiz}
                    </span>
                </Link>
                <Link to="/results">
                    <span className="text link">
                        {data.results}
                    </span>
                </Link>
            </nav> */}
            <div id="lang">
                <select id="languageSelector" onChange={(e) => loadLanguage(e.target.value)} value={language}>
                    <option value="en">🇬🇧</option>
                    <option value="fr">🇫🇷</option>
                    <option value="ar">🇩🇿</option>
                </select>
            </div>
        </header>
    )
}

export default Header