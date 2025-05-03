import { useState, useEffect } from "react";
import { fetchResources } from "../providers/ResourcesLoader"; // Your fetch logic
import { db } from "../config/firebase"; // Firebase config

// REFACTORED BY CHATGPT 

const useResourcesData = (category) => {
  const [resourcesData, setResourcesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setError("Category is required");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const fetchedResources = await fetchResources(db, category);
        setResourcesData(fetchedResources);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return { data: resourcesData, loading, error };
};

export default useResourcesData;
