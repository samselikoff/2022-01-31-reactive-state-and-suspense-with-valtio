import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { suspend } from "suspend-react";
import Dashboard from "../components/Dashboard";
import SignIn from "../components/SignIn";

let firebaseConfig = {
  apiKey: "AIzaSyC6m0utKMqus70Z7Ol8VGcx0rj_CV7iMNg",
  authDomain: "demos-fd990.firebaseapp.com",
  projectId: "demos-fd990",
  storageBucket: "demos-fd990.appspot.com",
  messagingSenderId: "1064038162599",
  appId: "1:1064038162599:web:2972d32d49d7d8315afb82",
};
let firebaseApp = initializeApp(firebaseConfig);
let auth = getAuth(firebaseApp);

async function getInitialAuthState() {
  return new Promise((resolve) => {
    let unsub = onAuthStateChanged(auth, (firebaseUser) => {
      resolve(firebaseUser);
      unsub();
    });
  });
}

export default function Home() {
  let currentUser = suspend(getInitialAuthState, ["initialAuthState"]);

  return currentUser ? (
    <Dashboard name={currentUser.displayName} />
  ) : (
    <SignIn />
  );
}
