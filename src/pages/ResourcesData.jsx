import { useLanguage } from "../contexts/language";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import "../styles/resources.css";
import toCamelCase from "../utils/toCamelCase";
import useResourcesData from "../hooks/useResourcesData";
import WebsiteIcon from "../assets/icons/website.svg";

const ResourcesData = () => {
  const { category, field } = useParams();
  const { language, translations, loading: languageLoading } = useLanguage();
  const { data: loadedResourcesData, loading: resourcesLoading, error } = useResourcesData(category);

  const fieldName = toCamelCase(field)?.replace("-", "") + "Name";

  if (languageLoading || resourcesLoading) return <Loading />;
  if (error) return <div className="error">Error loading resources: {error}</div>;

  const institutions = loadedResourcesData?.resources?.[field];

  if (!institutions || Object.keys(institutions).length === 0) {
    return (
      <section id="field-institutions">
        <h2 className="subtitle">{translations.noInstitutions || "No institutions available"}</h2>
      </section>
    );
  }

  return (
    <>
      <section id="field-header">
        <h1 className="title">{translations[fieldName] || ""}</h1>
      </section>
      <section id="field-institutions">
        {Object.entries(institutions).map(([institutionId, institutionData]) => (
          <div key={institutionId} className="institution-card">
            <h3 className="subtitle">{institutionData[language]}</h3>
            <span className="institution-website">
                <img src={WebsiteIcon} alt="Website" />
                <a href={institutionData.url} target="_blank" rel="noopener noreferrer" className="link">
                {institutionData.url}
                </a>
            </span>
          </div>
        ))}
      </section>
    </>
  );
};

export default ResourcesData;
