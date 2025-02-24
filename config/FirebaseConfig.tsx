import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import * as WebBrowser from "expo-web-browser";
import { getFirestore } from "firebase/firestore";

// Completes the authentication session (for web flow compatibility)
// WebBrowser.maybeCompleteAuthSession();

// Firebase configuration (Replace with your Firebase project credentials)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Use getAuth instead of initializeAuth
export const db = getFirestore(app);

export { auth };
