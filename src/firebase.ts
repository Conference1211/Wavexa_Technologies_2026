import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCFBnrMY1t38uadFFT0D9f3VXkEj8U3mlw",
  authDomain: "health-conference.firebaseapp.com",
  databaseURL: "https://health-conference-default-rtdb.firebaseio.com",
  projectId: "health-conference",
  storageBucket: "health-conference.firebasestorage.app",
  messagingSenderId: "895027321874",
  appId: "1:895027321874:web:bf94de8a6796c84e210ccb",
  measurementId: "G-XVMWTER02Z"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);