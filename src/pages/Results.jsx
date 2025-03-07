import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; // For charting (bar graph)
import { getPreviousResults } from "../utils/quizStorage"; // Function to get results from LocalStorage

const Results = ({ quizType }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    setResults(getPreviousResults(quizType));
  }, [quizType]);

  if (!results) return <p>No results found. Take the quiz first!</p>;

  return (
    <div>
      <h2>Results</h2>
      <Bar
        data={{
          labels: Object.keys(results),
          datasets: [
            {
              data: Object.values(results),
              backgroundColor: "blue", // Customize chart color
            },
          ],
        }}
      />
      <h3>Recommended Path: {Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b)}</h3>
    </div>
  );
};

export default Results;
