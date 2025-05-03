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
async function uploadResourcesData() {
  try {
    // Fetch the three JSON files concurrently
    const data = await fetch("/src/utils/ResourcesData.json");

    // Parse JSON responses
    const packet = await data.json();


    // Upload the packet into Firestore
    await setDoc(doc(db, "resources", "spr-sci"), { resources: packet });
    console.log("Resources Data uploaded successfully.");
  } catch (error) {
    console.error("Error during uploading resources data:", error);
  }
}

// Run the script
uploadResourcesData();