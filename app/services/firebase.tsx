import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRQmH0c2SgujZbPgAVBJkadqtdCi-jZGE",
  authDomain: "tidal-22798.firebaseapp.com",
  projectId: "tidal-22798",
  storageBucket: "tidal-22798.appspot.com",
  messagingSenderId: "179782453800",
  appId: "1:179782453800:web:514379c6a50145921c031d",
  measurementId: "G-ZMCNC8R8M4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
