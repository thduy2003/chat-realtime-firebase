// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfaeuezU-_4uvq4UoTJrK4H8hD-yypFkA",
    authDomain: "chat-app-b3388.firebaseapp.com",
    projectId: "chat-app-b3388",
    storageBucket: "chat-app-b3388.appspot.com",
    messagingSenderId: "104133907661",
    appId: "1:104133907661:web:4f6f187a17ae74b3790584",
    measurementId: "G-D480NE2VP8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()


// Create a root reference
export const storage = getStorage();
export const db = getFirestore();