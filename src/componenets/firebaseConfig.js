import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAXSMKiS59fbVkytc7iZzSq13GAYE8oSg0",
    authDomain: "tracking-app-ed85c.firebaseapp.com",
    projectId: "tracking-app-ed85c",
    storageBucket: "tracking-app-ed85c.appspot.com",
    messagingSenderId: "675153261090",
    appId: "1:675153261090:web:9e03472248767193dbd07b"
  };
firebase.initializeApp(firebaseConfig) ;

export const db = firebase.firestore();
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}
