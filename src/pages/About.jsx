import { useLanguage } from "../contexts/language";
import Loading from "../components/Loading";
import "../styles/about.css";
import RyanePhoto from "../assets/images/ryane-saada-afnoukh.webp";
import YacinePhoto from "../assets/images/yacine-hamdine.webp";
import SamyPhoto from "../assets/images/samy-berrich.webp";
import AbderraoufPhoto from "../assets/images/abderraouf-chekroun.webp";
import SarahPhoto from "../assets/images/pfp-default.jpg";
import LotfiPhoto from "../assets/images/pfp-default.jpg";
import MehdiPhoto from "../assets/images/pfp-default.jpg";
import OuaelPhoto from "../assets/images/pfp-default.jpg";
import EmailIcon from "../assets/icons/email.svg";
import LinkedinIcon from "../assets/icons/linkedin.svg";

const About = () => {
  const { translations, loading } = useLanguage();
  const data = translations;

  if (loading) return <Loading/>;

  return (
    <>
        <section id="about-header">
            <h1 className="title">{data.kaitenVokse}</h1>
        </section>
        <section id="about-mission">
            <div>
                <h2 className="subtitle">
                    {data.missionTitle}
                </h2>
            </div>
            <div>
                <p className="text">
                    {data.missionText}
                </p>
            </div>
        </section>
        <section id="about-team">
            <div>
                <h2 className="subtitle">
                    {data.teamTitle}
                </h2>
            </div>
            <div>
                <p className="text">
                    {data.teamText}
                </p>
            </div>
            <div id="team-members">
                <div className="team-member">
                    <div className="team-member-image">
                        <img src={RyanePhoto} alt="Ryane Saada Afnoukh" />
                    </div>
                    <div className="team-member-name blg">
                        <a href="https://linkedin.com/in/asryane" target="_blank">
                          {data.ryane}
                        </a>
                    </div>
                    <div className="team-member-role text">
                        {data.ceo}
                    </div>
                </div>
                <div className="team-member">
                    <div className="team-member-image">
                        <img src={YacinePhoto} alt="Yacine Hamdine" />
                    </div>
                    <div className="team-member-name blg">
                        <a href="https://linkedin.com/in/yacine-hamdine" target="_blank">
                            {data.yacine}
                        </a>
                    </div>
                    <div className="team-member-role text">
                        {data.cto}
                    </div>
                </div>
                <div className="team-member">
                    <div className="team-member-image">
                        <img src={SamyPhoto} alt="Samy Berrich" />
                    </div>
                    <div className="team-member-name blg">
                        <a href="https://linkedin.com/in/" target="_blank">
                            {data.samy}
                        </a>
                    </div>
                    <div className="team-member-role text">
                        {data.dev}
                    </div>
                </div>
                <div className="team-member">
                    <div className="team-member-image">
                        <img src={AbderraoufPhoto} alt="Abderraouf Chekroun" />
                    </div>
                    <div className="team-member-name blg">
                        <a href="https://linkedin.com/in/raouf-chekroun-04a108259/" target="_blank">
                            {data.abderraouf}
                        </a>
                    </div>
                    <div className="team-member-role text">
                        {data.dev}
                    </div>
                </div>
                <div className="team-member">
                    <div className="team-member-image">
                        <img src={SarahPhoto} alt="Sarah Khodja" />
                    </div>
                    <div className="team-member-name blg">
                        <a href="https://linkedin.com/in/" target="_blank">
                            {data.sarah}
                        </a>
                    </div>
                    <div className="team-member-role text">
                        {data.cmo}
                    </div>
                </div>
                <div className="team-member">
                    <div className="team-member-image">
                        <img src={LotfiPhoto} alt="Lotfi Hamdine" />
                    </div>
                    <div className="team-member-name blg">
                        <a href="https://linkedin.com/in/" target="_blank">
                            {data.lotfi}
                        </a>
                    </div>
                    <div className="team-member-role text">
                        {data.designer}
                    </div>
                </div>
                <div className="team-member">
                    <div className="team-member-image">
                        <img src={MehdiPhoto} alt="Mehdi Bendris" />
                    </div>
                    <div className="team-member-name blg">
                        <a href="https://linkedin.com/in/" target="_blank">
                            {data.mehdi}
                        </a>
                    </div>
                    <div className="team-member-role text">
                        {data.gs}
                    </div>
                </div>
                <div className="team-member">
                    <div className="team-member-image">
                        <img src={OuaelPhoto} alt="Ouael Benamara" />
                    </div>
                    <div className="team-member-name blg">
                        <a href="https://linkedin.com/in/" target="_blank">
                            {data.ouael}
                        </a>
                    </div>
                    <div className="team-member-role text">
                        {data.dev}
                    </div>
                </div>
            </div>
        </section>
        <section id="about-contact">
            <div className="contact-card">
                <div id="email-icon">
                    <img src={EmailIcon} alt="Email" />
                </div>
                <div id="email-link" className="link">
                    <a href="mailto:kaitenvoksegroup@gmail.com" target="_blank">
                        kaitenvoskegroup@gmail.com
                    </a>
                </div>
            </div>
            <div className="contact-card">
                <div id="linkedin-icon">
                    <img src={LinkedinIcon} alt="Linkedin" />
                </div>
                <div id="linkedin-link" className="link">
                    <a href="https://linkedin.com/company/kaiten-vokse-group" target="_blank">
                        Kaiten Vokse Group
                    </a>
                </div>
            </div>
        </section>
    </>
  );
};

export default About;