import React from "react";
import { useLanguage } from "../contexts/language"; // Import the context
function Footer() {

    const { translations, loading } = useLanguage();
    const data = translations;

    if (loading) return <p>&nbsp;</p>;

    return (
       <footer>
        <div id="credits">
            <span className="subtitle">
              {data.credits}
            </span>
            <br />
            <br />
            <span className="text">
              {data.ideaBy} :
              <br />
              <b>
                <a href="https://linkedin.com/in/asryane" target="_blank">
                  {data.ryane}
                </a>
              </b>
              <br />
              <br />
              {data.builtBy} :
              <br />
              <b>
                <a href="https://linkedin.com/in/yacine-hamdine" target="_blank">
                  {data.yacine}
                </a>
                <br />
                <a href="https://linkedin.com/in/" target="_blank">
                  {data.samy}
                </a>
              </b>
            </span>
        </div>
        <div id="infos">
            <span className="subtitle">
              {data.about}
            </span>
            <br />
            <br />
            <span className="text">
              {data.infos}
              <br />
              <br />
              &copy; {new Date().getFullYear()} - {data.copyright}
            </span>
        </div>
       </footer> 
    )
}

export default Footer