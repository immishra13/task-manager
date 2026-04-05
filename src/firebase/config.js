import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4M9x9ztQS_BYz9U6qysaNs7BssBQ8HNE",
  authDomain: "cloud-mini-project-10b6f.firebaseapp.com",
  databaseURL: "https://cloud-mini-project-10b6f-default-rtdb.firebaseio.com",
  projectId: "cloud-mini-project-10b6f",
  storageBucket: "cloud-mini-project-10b6f.firebasestorage.app",
  messagingSenderId: "1079090725301",
  appId: "1:1079090725301:web:c72176f733ee8503abd9fc",
  measurementId: "G-XTBL0PZQJM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
