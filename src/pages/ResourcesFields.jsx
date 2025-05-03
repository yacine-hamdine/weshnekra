import { useLanguage } from "../contexts/language";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/resources.css";
import toCamelCase from "../utils/toCamelCase";
import useResourcesData from "../hooks/useResourcesData";

// REFACTORED BY CHATGPT 
const ResourcesFields = () => {
  const { category } = useParams();
  const { translations, loading: languageLoading } = useLanguage();
  const { data: loadedResourcesData, loading: resourcesLoading, error } = useResourcesData(category);

  const navigate = useNavigate();
  const categoryName = toCamelCase(category)?.replace("-", "") + "Name";

  if (languageLoading || resourcesLoading) return <Loading />;
  if (error) return <div className="error">Error loading resources: {error}</div>;

  return (
    <>
      <section id="category-header">
        <h1 className="title">{translations[categoryName] || ""}</h1>
      </section>
      <section id="category-fields">
        {
          loadedResourcesData?.resources &&
          Object.entries(loadedResourcesData.resources).map(([fieldKey, institutions], index) => (
            <div key={index} className="field">
              <h2 className="subtitle">
                {translations[toCamelCase(fieldKey).replace("-", "") + "Name"]}
              </h2>
              <p className="text">
                <b className="lg-txt">{Object.entries(institutions).length}</b> {translations.institutions}
              </p>
              <button className="main-btn" onClick={() => navigate(`/resources/${category}/${fieldKey}`)}>
                {translations.viewResources}
              </button>
            </div>
          ))
        }
      </section>
    </>
  );
};

export default ResourcesFields;
