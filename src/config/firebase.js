// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxhUQWjqeepl3xdAaRw_yJXCV6Uajoogk",
  authDomain: "wesh-nekra.firebaseapp.com",
  projectId: "wesh-nekra",
  storageBucket: "wesh-nekra.firebasestorage.app",
  messagingSenderId: "964333322456",
  appId: "1:964333322456:web:8a0880b70cca0881ae97ad",
  measurementId: "G-2PRL30K9WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Export It
export const db = getFirestore(app);