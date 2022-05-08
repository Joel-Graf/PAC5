import "./App.css";
import React, { useEffect } from "react";
const {
  getFirestore,
  collection,
  getDocs,
} = require("firebase/firestore/lite");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} = require("firebase/auth");
const provider = new GoogleAuthProvider();

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCB4tJiWBcHOdsmE2pzbm80xfd1zCNv8Dc",
  authDomain: "boxwood-chalice-339814.firebaseapp.com",
  databaseURL: "https://boxwood-chalice-339814-default-rtdb.firebaseio.com",
  projectId: "boxwood-chalice-339814",
  storageBucket: "boxwood-chalice-339814.appspot.com",
  messagingSenderId: "77685519438",
  appId: "1:77685519438:web:6a47db9f8088883451ff1f",
  measurementId: "G-40HP4GZ066",
});
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in");
  } else {
    signInWithRedirect(auth, provider);
  }
});

function App() {
  useEffect(() => {
    // api.get("get", { data: "blasius" }).then((res) => {
    //   console.log("teste res", res.data);
    // });
  }, []);

  return (
    <div className="App">
      <span> teste </span>
    </div>
  );
}

export default App;