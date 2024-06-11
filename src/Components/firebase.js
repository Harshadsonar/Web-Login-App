import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//getAuth it helps register our user to the firebase console/firebase project and it will give us the user authentication

const firebaseConfig = {
    apiKey: "AIzaSyDt-HUeYp2t2S9Fh_e6_TTRrAMIUFHFznU",
    authDomain: "web-login-app-425411.firebaseapp.com",
    projectId: "web-login-app-425411",
    storageBucket: "web-login-app-425411.appspot.com",
    messagingSenderId: "194759883745",
    appId: "1:194759883745:web:6ae5d19598458ec656b0a0",
    measurementId: "G-WB2FBDERK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
export const db = getFirestore(app);
export default app;