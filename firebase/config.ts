// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfEhjL5IRoSxwG1VHwh0IsYTWEMFFIdkw",
  authDomain: "ecommerce-store-de5a4.firebaseapp.com",
  projectId: "ecommerce-store-de5a4",
  storageBucket: "ecommerce-store-de5a4.firebasestorage.app",
  messagingSenderId: "59111859619",
  appId: "1:59111859619:web:b3cacbd73fef9867bc6616",
  measurementId: "G-X8TR1ZLCVS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
