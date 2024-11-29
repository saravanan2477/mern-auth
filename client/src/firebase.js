import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b084d.firebaseapp.com",
  projectId: "mern-auth-b084d",
  storageBucket: "mern-auth-b084d.firebasestorage.app",
  messagingSenderId: "713365642679",
  appId: "1:713365642679:web:6db59763c767f35afe1c32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
