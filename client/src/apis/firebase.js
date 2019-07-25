
import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCKjwCC0ShuBRajfZeMZGdA5rvCGhTnZgM",
  authDomain: "eat-word.firebaseapp.com",
  databaseURL: "https://eat-word.firebaseio.com",
  projectId: "eat-word",
  storageBucket: "",
  messagingSenderId: "226519008036",
  appId: "1:226519008036:web:bbdda6fd0ffbd5fe"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export default db

