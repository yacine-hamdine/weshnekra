import React, { createContext, useContext, useState, useEffect } from "react";

// Create Language Context
const LanguageContext = createContext();

// Language Provider Component
export function LanguageProvider({ children }) {
  // Load language from localStorage or default to "en"
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const [translations, setTranslations] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch translations when the language changes
  useEffect(() => {
    setLoading(true);
    fetch(`/locales/${language}.json`)
      .then((res) => res.json())
      .then((data) => {
        setTranslations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading language file:", err);
        setLoading(false);
      });
  }, [language]);

  // Save the selected language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ translations, language, setLanguage, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom Hook for easier usage
export function useLanguage() {
  return useContext(LanguageContext);
}