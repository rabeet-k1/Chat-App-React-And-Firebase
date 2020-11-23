import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDdQajkPO7lN-vkOGn_DDE3XZZAnXX91tQ",
  authDomain: "react-chat-app-bc4eb.firebaseapp.com",
  databaseURL: "https://react-chat-app-bc4eb.firebaseio.com",
  projectId: "react-chat-app-bc4eb",
  storageBucket: "react-chat-app-bc4eb.appspot.com",
  messagingSenderId: "951387680787",
  appId: "1:951387680787:web:c93cfb8fd379a849720fe6",
  measurementId: "G-1VXC95F58H"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
