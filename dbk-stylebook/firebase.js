// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkvFT6AjG7_21txvEHSEtl2ySrHtcnCOw",
  authDomain: "dbk-stylebook-27a2d.firebaseapp.com",
  projectId: "dbk-stylebook-27a2d",
  storageBucket: "dbk-stylebook-27a2d.appspot.com",
  messagingSenderId: "80751023137",
  appId: "1:80751023137:web:bbf4c5402376786f8d3f60",
  measurementId: "G-CD1HJQJE7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
analytics.isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics };