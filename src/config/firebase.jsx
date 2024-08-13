// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLfELICvtvDrDTURypYe99_s4K2m-KyBQ",
  authDomain: "roles-804.firebaseapp.com",
  projectId: "roles-804",
  storageBucket: "roles-804.appspot.com",
  messagingSenderId: "442192660028",
  appId: "1:442192660028:web:7a213f40265987c026a539",
  measurementId: "G-BGPM9HLPW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { firestore, auth,app};