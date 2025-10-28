// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM1TJbeXZGZJP9TUhZHj6XaZPBt69SO1M",
  authDomain: "reactfb-808f8.firebaseapp.com",
  projectId: "reactfb-808f8",
  storageBucket: "reactfb-808f8.firebasestorage.app",
  messagingSenderId: "759752714095",
  appId: "1:759752714095:web:bd1cf2d9fc63b85ad9aa9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);