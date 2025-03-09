import React, { useContext } from "react";
import { LanguageContext } from "../contexts/language"; // Import the context
import Menu from "../styles/menu.jsx";
import Logo from "../assets/logos/logo.svg"


function Header() {

    const { language, loadLanguage } = useContext(LanguageContext);

    return (
        <header>
            <div id="hamburger">
                <svg className="icon" id="hmbgr" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
            </div>
            <div id="logo" className="subtitle">
                <img src={Logo} alt="Logo" />
            </div>
            <Menu />
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