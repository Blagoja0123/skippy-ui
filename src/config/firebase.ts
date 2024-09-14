// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const STORAGE_FOLDER_PATH = "gs://skippy-c6213.appspot.com";
export const storage = getStorage(app, STORAGE_FOLDER_PATH);

export default app;

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCJnR56R-w2VOZdFSk08Po4ydHGLrUkYFE",
//   authDomain: "skippy-c6213.firebaseapp.com",
//   projectId: "skippy-c6213",
//   storageBucket: "skippy-c6213.appspot.com",
//   messagingSenderId: "1093972504125",
//   appId: "1:1093972504125:web:5afd14aa2559fcd4788454"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);