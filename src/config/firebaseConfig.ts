// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALSvIPgSDm9rLGALLN4eiiaUr80dmPbZU",
  authDomain: "cms-ticket-sale-65085.firebaseapp.com",
  projectId: "cms-ticket-sale-65085",
  storageBucket: "cms-ticket-sale-65085.appspot.com",
  messagingSenderId: "989612572319",
  appId: "1:989612572319:web:dcded82783798308896caa",
  measurementId: "G-0GEVXWLXSP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export default database;
