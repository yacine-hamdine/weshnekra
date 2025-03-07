import { doc, getDoc } from "firebase/firestore";
import { openDB } from "idb"; // IndexedDB helper library

const DB_NAME = "quizDB";
const STORE_NAME = "questions";

const saveToIndexedDB = async (quizType, questions) => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  await db.put(STORE_NAME, { questions, timestamp: Date.now() }, quizType);
};

const getFromIndexedDB = async (quizType) => {
  const db = await openDB(DB_NAME, 1);
  return db.get(STORE_NAME, quizType);
};

export const fetchQuestions = async (db, quizType) => {
  const cachedData = await getFromIndexedDB(quizType);
  if (cachedData && Date.now() - cachedData.timestamp < 86400000) {
    console.log("Loaded from IndexedDB");
    return cachedData.questions;
  }

  const docRef = doc(db, "quizzes", quizType);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const questions = docSnap.data().questions;
    await saveToIndexedDB(quizType, questions);
    console.log("Loaded from Firestore");
    return questions;
  } else {
    console.error("No quiz data found!");
    return [];
  }
};
