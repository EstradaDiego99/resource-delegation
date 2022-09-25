// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVdhBTSRlUGeqv81UZCzF9W3FMb5q8qA8",
  authDomain: "resource-delegation.firebaseapp.com",
  projectId: "resource-delegation",
  storageBucket: "resource-delegation.appspot.com",
  messagingSenderId: "229874747892",
  appId: "1:229874747892:web:d07f9a7445f98c0b5751a1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });

export { firebaseApp };
