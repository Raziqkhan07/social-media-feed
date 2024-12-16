import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1GPDVwA0L3yILndCxtAa0StS8BOn_Aw4",
    authDomain: "social-media-feed-38ac1.firebaseapp.com",
    projectId: "social-media-feed-38ac1",
    storageBucket: "social-media-feed-38ac1.firebasestorage.app",
    messagingSenderId: "50472745647",
    appId: "1:50472745647:web:03edc76e5da95b9b21f25a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


