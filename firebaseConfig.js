import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSrjq4Y8Z1dp3i7ZDl-qd4QHR7IMXhKM4",
    authDomain: "fide223.firebaseapp.com",
    projectId: "fide223",
    storageBucket: "fide223.appspot.com",
    messagingSenderId: "44077932501",
    appId: "1:44077932501:web:d045be8744205d75efe75c",
    measurementId: "G-8QM4DQPYW4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };