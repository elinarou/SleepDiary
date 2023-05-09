import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9ESbasgkPl9Zo9nwdU5JhP_xIwKD1S4Q",
  authDomain: "sleepdiary-22a6f.firebaseapp.com",
  projectId: "sleepdiary-22a6f",
  storageBucket: "sleepdiary-22a6f.appspot.com",
  messagingSenderId: "1004386482840",
  appId: "1:1004386482840:web:d6e7cfd3735f21eeec6eed"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
