// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAES57bXIl7biG_iPZyhfAP5fGuOPMxIVo",
  authDomain: "qan-handiwork.firebaseapp.com",
  projectId: "qan-handiwork",
  storageBucket: "qan-handiwork.appspot.com",
  messagingSenderId: "325753802026",
  appId: "1:325753802026:web:d6640f4d36d23831b0a253",
  measurementId: "G-R0V8VW2MLF"
};

// Initialize Firebase Authentication and get a reference to the service
const authApp = getAuth(app);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });