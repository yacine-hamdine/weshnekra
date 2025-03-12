import React from "react";
import { useLanguage } from "../contexts/language"; // Import the context
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Logo from "../assets/logos/logo.svg";

function Header() {
    const { language, setLanguage } = useLanguage(); // Use setLanguage to change the language

    return (
        <header>
            <div id="hamburger">
                <svg className="icon" id="hmbgr" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
            </div>
            <div id="logo" className="subtitle">
                <Link to="/">
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <Menu />
            <div id="lang">
                <select id="languageSelector" onChange={(e) => setLanguage(e.target.value)} value={language}>
                    <option value="en">🇬🇧</option>
                    <option value="fr">🇫🇷</option>
                    <option value="ar">🇩🇿</option>
                </select>
            </div>
        </header>
    );
}

export default Header;
