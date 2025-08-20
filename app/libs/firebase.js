import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMWRQNUny19mtBzX_l_VvHxiZCLJ9weOg",
  authDomain: "royal-shine-38afe.firebaseapp.com",
  projectId: "royal-shine-38afe",
  storageBucket: "royal-shine-38afe.firebasestorage.app",
  messagingSenderId: "850140849738",
  appId: "1:850140849738:web:e5f7d9219bc92c56bae8b3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
