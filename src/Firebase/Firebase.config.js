// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMXlTNyPjVpON6H5yRQ8J9TfkQ8uZk1JM",
  authDomain: "ema-john-with-firebase-a-d4701.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-d4701",
  storageBucket: "ema-john-with-firebase-a-d4701.appspot.com",
  messagingSenderId: "959437167724",
  appId: "1:959437167724:web:d18b59f861fd2874da8c49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;