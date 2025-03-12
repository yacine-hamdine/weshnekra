import { doc, getDoc } from "firebase/firestore";
import { openDB } from "idb"; // IndexedDB helper library

const DB_NAME = "quizDB";
const STORE_NAME = "questions";

const openDatabase = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

const saveToIndexedDB = async (quizType, questions) => {
  const db = await openDatabase();
  await db.put(STORE_NAME, { questions, timestamp: Date.now() }, quizType);
};

const getFromIndexedDB = async (quizType) => {
  const db = await openDatabase();
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