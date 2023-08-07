import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
console.log(process.env.REACT_APP_A , 'api key')
const firebaseConfig = {
  apiKey:process.env.REACT_APP_A ,
  authDomain:process.env.REACT_APP_B ,
  projectId: process.env.REACT_APP_C,
  storageBucket:process.env.REACT_APP_D ,
  messagingSenderId:process.env.REACT_APP_E ,
  appId: process.env.REACT_APP_F
  };

firebase.initializeApp(firebaseConfig, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
}) ;

export const db = firebase.firestore();
const myapp = initializeApp(firebaseConfig , {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
})
const  auth = getAuth(myapp)
export {auth}
