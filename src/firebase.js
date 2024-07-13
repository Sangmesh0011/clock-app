import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API,
  authDomain: "clock-app-844f8.firebaseapp.com",
  projectId: "clock-app-844f8",
  storageBucket: "clock-app-844f8.appspot.com",
  messagingSenderId: "435711793145",
  appId: process.env.REACT_APP_APP_ID
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export default app;