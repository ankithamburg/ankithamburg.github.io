import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMiaSbEU5Mwo6KM_CE-W-b3ikgQq-AqOQ",
    authDomain: "ankithamburgpt.firebaseapp.com",
    projectId: "ankithamburgpt",
    storageBucket: "ankithamburgpt.firebasestorage.app",
    messagingSenderId: "98446620887",
    appId: "1:98446620887:web:3724ad39c8e0b9b5219892",
    measurementId: "G-C8HPDXLLK3"
  };


// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();