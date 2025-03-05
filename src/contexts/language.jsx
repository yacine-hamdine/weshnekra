import React, { createContext, useState, useEffect } from "react";

// Create the context
export const LanguageContext = createContext();

// Create a provider component
export const LanguageProvider = ({ children }) => {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  // Function to load language data
  const loadLanguage = async (lang) => {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      setTranslations(data);
      setLanguage(lang);
      localStorage.setItem("language", lang);
    } catch (error) {
      console.error("Error loading language file:", error);
    }
  };

  // Load the saved language on mount
  useEffect(() => {
    loadLanguage(language);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, translations, loadLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
