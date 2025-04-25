import { useLanguage } from "../contexts/language";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import "../styles/resources.css";
import XctSciIcon from "../assets/icons/xct-sci.svg";
import LthSciIcon from "../assets/icons/lth-sci.svg";
import HmnSciIcon from "../assets/icons/hmn-sci.svg";
import EcnBsnIcon from "../assets/icons/ecn-bsn.svg";
import ArcDsgIcon from "../assets/icons/arc-dsg.svg"
import SprSciIcon from "../assets/icons/spr-sci.svg";
import LngLitIcon from "../assets/icons/lng-lit.svg";

const Resources = () => {
    const { translations, loading } = useLanguage();
    const data = translations;
  
    if (loading) return <Loading/>;
  
    return (
      <>
        <section id="resources-header">
            <h1 className="title">{data.resourcesTitle}</h1>
            <p className="text">{data.resourcesText}</p>
        </section>
        <section id="resources-categories">
            <div id="resources-name">
                <h2 className="subtitle">{data.resourcesCategories}</h2>
            </div>
            <div className="categories">
                <div className="category">
                    <div className="category-icon-and-name">
                        <img src={XctSciIcon} alt="Exact Sciences" />
                        <h3 className="subtitle">{data.xctSciName}</h3>
                    </div>
                    <div className="category-data text">
                       {
                        // TODO: add function that counts available resources (number of specialities/fields)
                       }
                       Number of Specialities/Fields
                    </div>
                    <div className="category-btn">
                        <Link to={"/resources/xct-sci"}>
                            <button className="main-btn">
                                {data.viewResources}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="category">
                    <div className="category-icon-and-name">
                        <img src={LthSciIcon} alt="Health Sciences" />
                        <h3 className="subtitle">{data.lthSciName}</h3>
                    </div>
                    <div className="category-data text">
                       {
                        // TODO: add function that counts available resources (number of specialities/fields)
                       }
                       Number of Specialities/Fields
                    </div>
                    <div className="category-btn">
                        <Link to={"/resources/lth-sci"}>
                            <button className="main-btn">
                                {data.viewResources}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="category">
                    <div className="category-icon-and-name">
                        <img src={HmnSciIcon} alt="Human and Social Sciences" />
                        <h3 className="subtitle">{data.hmnSciName}</h3>
                    </div>
                    <div className="category-data text">
                       {
                        // TODO: add function that counts available resources (number of specialities/fields)
                       }
                       Number of Specialities/Fields
                    </div>
                    <div className="category-btn">
                        <Link to={"/resources/hmn-sci"}>
                            <button className="main-btn">
                                {data.viewResources}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="category">
                    <div className="category-icon-and-name">
                        <img src={EcnBsnIcon} alt="Economics & Business Sciences" />
                        <h3 className="subtitle">{data.ecnBsnName}</h3>
                    </div>
                    <div className="category-data text">
                       {
                        // TODO: add function that counts available resources (number of specialities/fields)
                       }
                       Number of Specialities/Fields
                    </div>
                    <div className="category-btn">
                        <Link to={"/resources/ecn-bsn"}>
                            <button className="main-btn">
                                {data.viewResources}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="category">
                    <div className="category-icon-and-name">
                        <img src={LngLitIcon} alt="Languages & Litterature" />
                        <h3 className="subtitle">{data.lngLitName}</h3>
                    </div>
                    <div className="category-data text">
                       {
                        // TODO: add function that counts available resources (number of specialities/fields)
                       }
                       Number of Specialities/Fields
                    </div>
                    <div className="category-btn">
                        <Link to={"/resources/lng-lit"}>
                            <button className="main-btn">
                                {data.viewResources}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="category">
                    <div className="category-icon-and-name">
                        <img src={SprSciIcon} alt="Sports Sciences" />
                        <h3 className="subtitle">{data.sprSciName}</h3>
                    </div>
                    <div className="category-data text">
                       {
                        // TODO: add function that counts available resources (number of specialities/fields)
                       }
                       Number of Specialities/Fields
                    </div>
                    <div className="category-btn">
                        <Link to={"/resources/spr-sci"}>
                            <button className="main-btn">
                                {data.viewResources}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="category">
                    <div className="category-icon-and-name">
                        <img src={ArcDsgIcon} alt="Architecture & Design" />
                        <h3 className="subtitle">{data.arcDsgName}</h3>
                    </div>
                    <div className="category-data text">
                       {
                        // TODO: add function that counts available resources (number of specialities/fields)
                       }
                       Number of Specialities/Fields
                    </div>
                    <div className="category-btn">
                        <Link to={"/resources/arc-dsg"}>
                            <button className="main-btn">
                                {data.viewResources}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
  };
  
  export default Resources;