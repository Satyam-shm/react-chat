import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEu5YdzVy0DFnrrZ0nREPq8sMkPRJ0lXI",
  authDomain: "react-app-6b9b9.firebaseapp.com",
  projectId: "react-app-6b9b9",
  storageBucket: "react-app-6b9b9.appspot.com",
  messagingSenderId: "845042779543",
  appId: "1:845042779543:web:e32339ed33f636eaddf0d2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
