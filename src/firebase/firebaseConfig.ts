import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDblEZVQH7hE0N4EdnlrlGB5TAYXBQiwBQ",
  authDomain: "all-memes-here.firebaseapp.com",
  projectId: "all-memes-here",
  storageBucket: "all-memes-here.appspot.com",
  messagingSenderId: "117659624735",
  appId: "1:117659624735:web:4b57a751dd0bf09b5e3c2a"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
