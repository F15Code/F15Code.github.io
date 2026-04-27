import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrIRpYkpeXwwG00d6KWG5U3ciBNz2h1N0",
  authDomain: "drive-now-db.firebaseapp.com",
  projectId: "drive-now-db",
  storageBucket: "drive-now-db.firebasestorage.app",
  messagingSenderId: "544131129908",
  appId: "1:544131129908:web:dd149752f3991f9930e061"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);      // Для реєстрації та входу
export const db = getFirestore(app);