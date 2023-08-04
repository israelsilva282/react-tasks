import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCzET-OJrzE6BgO0kJ1HcOecQm7iYTFzI",
    authDomain: "react-tasks-2b9c6.firebaseapp.com",
    projectId: "react-tasks-2b9c6",
    storageBucket: "react-tasks-2b9c6.appspot.com",
    messagingSenderId: "683272883193",
    appId: "1:683272883193:web:83ffeb3a8ac87b85984b28",
    measurementId: "G-QYQS74JM58"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
