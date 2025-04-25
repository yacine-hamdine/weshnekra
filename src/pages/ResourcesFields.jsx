import { useLanguage } from "../contexts/language";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/resources.css";
import toCamelCase from "../utils/toCamelCase";

const ResourcesFields = () => {
    const { category } = useParams();
    const { language, translations, loading } = useLanguage();
    const data = translations;

    const navigate = useNavigate();
    const categoryName = `${toCamelCase(category)?.replace("-", "")}Name`;
  
    if (loading) return <Loading/>;
  
    return (
      <>
        <section id="category-header">
            <h1 className="title">{data[categoryName] || ""}</h1>
        </section>
        <section id="category-fields">
            <div id="field-name">
                <h2 className="subtitle">{data[`${toCamelCase(category)?.replace("-", "")}Fields`] || ""}</h2>
            </div>
            <div className="fields">
                {
                    data[`${toCamelCase(category)?.replace("-", "")}FieldsData`]?.map((field, index) => (
                        <div key={index} className="field" onClick={() => navigate(`/resources/${category}/${field.name}`)}>
                            <img src={field.icon} alt={field.name} />
                            <h3 className="subtitle">{field.name}</h3>
                        </div>
                    ))
                }
            </div>
        </section>
        {/* <section id="category-cards">
            <div id="category-name">
                <h2 className="subtitle">{data[`${toCamelCase(category)?.replace("-", "")}Fields`] || ""}</h2>
            </div>
            <div className="cards">
                {
                    data[`${toCamelCase(category)?.replace("-", "")}FieldsData`]?.map((field, index) => (
                        <div key={index} className="card">
                            <div className="card-icon-and-name">
                                <img src={field.icon} alt={field.name} />
                                <h3 className="subtitle">{field.name}</h3>
                            </div>
                            <div className="card-data text">
                                {field.description}
                            </div>
                            <div className="card-btn">
                                <button className="main-btn" onClick={() => navigate(`/resources/${category}/${field.name}`)}>
                                    {data.viewResources}
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section> */}
      </>
    );
  };
  
  export default ResourcesFields;