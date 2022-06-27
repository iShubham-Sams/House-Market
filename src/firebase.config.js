// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1av-6AOfBMV7ogvOydRYw5bRlgZXGJzc",
  authDomain: "house-market-d65f9.firebaseapp.com",
  projectId: "house-market-d65f9",
  storageBucket: "house-market-d65f9.appspot.com",
  messagingSenderId: "766771474887",
  appId: "1:766771474887:web:c297d453e22399427169e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const db= getFirestore()
export const auth = getAuth(app);



