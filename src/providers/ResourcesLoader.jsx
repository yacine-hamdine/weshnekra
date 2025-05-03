import { doc, getDoc } from "firebase/firestore";
import { openDB } from "idb"; // IndexedDB helper library

const DB_NAME = "resourcesDB";
const STORE_NAME = "resources";

// Open or upgrade the IndexedDB
const openDatabase = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

// Save resource data to IndexedDB
const saveToIndexedDB = async (category, resources) => {
  const db = await openDatabase();
  await db.put(STORE_NAME, { resources, timestamp: Date.now() }, category);
};

// Get resource data from IndexedDB
const getFromIndexedDB = async (category) => {
  const db = await openDatabase();
  return db.get(STORE_NAME, category);
};

// Fetch resources from Firestore or IndexedDB
export const fetchResources = async (db, category) => {
  const cachedData = await getFromIndexedDB(category);
  if (cachedData && Date.now() - cachedData.timestamp < 86400000) {
    console.log("Loaded resources from IndexedDB");
    return cachedData.resources;
  }

  const docRef = doc(db, "resources", category);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const resources = docSnap.data() || {}; // Ensure fields is an array
    await saveToIndexedDB(category, resources);
    console.log("Loaded resources from Firestore");
    return resources;
  } else {
    console.error("No resources data found!");
    return [];
  }
};
