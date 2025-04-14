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
              {data.linkedin} :
              <br />
              <b>
                <a href="https://linkedin.com/company/kaiten-vokse-group" target="_blank">
                  Kaiten Vokse Group
                </a>
              </b>
              <br />
              <br />
              {data.email} :
              <br />
              <b>
                <a href="mailto:kaitenvoksegroup@gmail.com" target="_blank">
                  kaitenvoskegroup@gmail.com
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