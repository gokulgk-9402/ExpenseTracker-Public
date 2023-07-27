// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and lter, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk8CYOa0pdIly3L_QnBOW7GhibMH--b7A",
  authDomain: "expensetrackernextjs.firebaseapp.com",
  projectId: "expensetrackernextjs",
  storageBucket: "expensetrackernextjs.appspot.com",
  messagingSenderId: "455399675729",
  appId: "1:455399675729:web:60cfec8b8cace36b3a2570",
  measurementId: "G-FD367VJ5VD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
