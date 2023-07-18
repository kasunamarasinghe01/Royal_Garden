// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCENRO463dTgBrsp9u1Cg_8Ksq-nImwX8Y",
  authDomain: "royal-garden-3e027.firebaseapp.com",
  projectId: "royal-garden-3e027",
  storageBucket: "royal-garden-3e027.appspot.com",
  messagingSenderId: "1026422363663",
  appId: "1:1026422363663:web:94dc9ed4aeaaed2e42357a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);