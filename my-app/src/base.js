import firebase from 'firebase/app';
import "firebase/storage"
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZi-GpuDMwhse1CLyek9V6fPfMw8BdoZU",
    authDomain: "csci3100-2bab5.firebaseapp.com",
    projectId: "csci3100-2bab5",
    storageBucket: "csci3100-2bab5.appspot.com",
    messagingSenderId: "28204617057",
    appId: "1:28204617057:web:41bc8749180fa42061c920",
    measurementId: "G-RP7QYX8JMW"
  };
  // Initialize Firebase
  export const app = firebase.initializeApp(firebaseConfig);
