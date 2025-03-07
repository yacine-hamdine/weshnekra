export const saveResults = (quizType, scores) => {
  localStorage.setItem(`quiz_results_${quizType}`, JSON.stringify(scores));
};

export const getPreviousResults = (quizType) => {
  const data = localStorage.getItem(`quiz_results_${quizType}`);
  return data ? JSON.parse(data) : null;
};