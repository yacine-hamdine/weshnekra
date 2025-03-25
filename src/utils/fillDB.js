// Import Firebase modules (v9+ modular API)
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your Firebase configuration – replace with your actual config
const firebaseConfig = {
    apiKey: "AIzaSyCJ8kcQBO_ZePCJ77zJmPSyKCamHrgQt3Q",
    authDomain: "wesh-nekra.firebaseapp.com",
    projectId: "wesh-nekra",
    storageBucket: "wesh-nekra.firebasestorage.app",
    messagingSenderId: "964333322456",
    appId: "1:964333322456:web:8a0880b70cca0881ae97ad",
    measurementId: "G-2PRL30K9WX"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch and merge JSON files and upload to Firestore
async function mergeAndUploadQuiz() {
  try {
    // Fetch the three JSON files concurrently
    const [enRes, frRes, arRes] = await Promise.all([
      fetch("/src/utils/enData.json"),
      fetch("/src/utils/frData.json"),
      fetch("/src/utils/arData.json"),
    ]);

    // Parse JSON responses
    const [enData, frData, arData] = await Promise.all([
      enRes.json(),
      frRes.json(),
      arRes.json(),
    ]);

    // Check that all arrays have the same length
    if (enData.length !== frData.length || enData.length !== arData.length) {
      throw new Error("The JSON files do not have the same number of questions.");
    }

    const numQuestions = enData.length;
    const mergedQuestions = [];

    // List of keys to extract from the English file for weights
    const weightKeys = [
        "ort-lth",
      "sst-lth",
      "dtt-lth",
      "rgt-lth",
      "hyg-lth",
      "nrs-lth",
      "kns-lth",
      "lbr-lth",
      "med-img",
      "med-sci",
      "dnt-med",
      "orh-lth",
      "phm-sci",
      "phm-aux",
      "phm-nds",
      "phm-prp",
      "dnt-lth",
      "psm-lth",
      "mdw-lth",
      "vtr-sci"
    ];

    // Loop through each question and build the merged object
    for (let i = 0; i < numQuestions; i++) {
      const enQuestion = enData[i];
      const frQuestion = frData[i];
      const arQuestion = arData[i];

      // Build the weights object
      const weights = {};
      weightKeys.forEach((key) => {
        const value = enQuestion["weights"][key];
        weights[key] = value;
      });

      // Create the merged question object
      const mergedQuestion = {
        id: `Q${i + 1}`,
        en: enQuestion["Q"],
        fr: frQuestion["Q"],
        ar: arQuestion["Q"],
        weights: weights,
      };

      mergedQuestions.push(mergedQuestion);
    }

    // Upload the merged data into Firestore
    await setDoc(doc(db, "quizzes", "lth-sci"), { questions: mergedQuestions });
    console.log("Quiz questions uploaded successfully.");
  } catch (error) {
    console.error("Error during merging and uploading:", error);
  }
}

// Run the script
mergeAndUploadQuiz();



// export const saveResults = (quizType, scores) => {
//   localStorage.setItem(`quiz_results_${quizType}`, JSON.stringify(scores));
// };

// export const getPreviousResults = (quizType) => {
//   const data = localStorage.getItem(`quiz_results_${quizType}`);
//   return data ? JSON.parse(data) : null;
// };

