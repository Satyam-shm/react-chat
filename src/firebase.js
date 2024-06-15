import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEu5YdzVy0DFnrrZ0nREPq8sMkPRJ0lXI",
  authDomain: "react-app-6b9b9.firebaseapp.com",
  projectId: "react-app-6b9b9",
  storageBucket: "react-app-6b9b9.appspot.com",
  messagingSenderId: "845042779543",
  appId: "1:845042779543:web:e32339ed33f636eaddf0d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
