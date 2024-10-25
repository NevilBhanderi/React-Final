// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVwwABqZGF-0J3a3aiHLfB9c6NvxVo_dw",
    authDomain: "reactjs-final.firebaseapp.com",
    projectId: "reactjs-final",
    storageBucket: "reactjs-final.appspot.com",
    messagingSenderId: "162065001005",
    appId: "1:162065001005:web:5d1219b7027eeda5a5a6a4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const provider = new GoogleAuthProvider;

export {auth ,db, provider} 