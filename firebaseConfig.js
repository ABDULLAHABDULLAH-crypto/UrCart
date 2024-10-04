// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_w6LV2Rhhv7Lxv25F0DJyd0YOHswRQC0",
  authDomain: "ur-cart-af530.firebaseapp.com",
  projectId: "ur-cart-af530",
  storageBucket: "ur-cart-af530.appspot.com",
  messagingSenderId: "802754530569",
  appId: "1:802754530569:web:f08ba0ff64f5ba792397d8",
  measurementId: "G-JS06DZS3GK"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
// for initializing services
const auth = getAuth(app);
 
export { auth};