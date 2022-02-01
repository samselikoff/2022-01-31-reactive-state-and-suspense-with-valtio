import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { suspend } from "suspend-react";
import Dashboard from "../components/Dashboard";
import SignIn from "../components/SignIn";

import { proxy, useSnapshot } from "valtio";

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

let resolve;
let fetchInitialSession = new Promise((r) => (resolve = r));

onAuthStateChanged(auth, (firebaseUser) => {
  sessionState.currentUser = firebaseUser;
  resolve();
});

let sessionState = proxy({
  currentUser: undefined,
  get status() {
    return this.currentUser === undefined
      ? "unknown"
      : this.currentUser === null
      ? "unauthenticated"
      : "authenticated";
  },
});

function useSession() {
  let { currentUser, status } = useSnapshot(sessionState);

  if (status === "unknown") {
    throw fetchInitialSession;
  }

  return {
    status,
    currentUser,
  };
}

export default function Home() {
  let { currentUser } = useSession();

  return currentUser ? (
    <Dashboard name={currentUser.displayName} />
  ) : (
    <SignIn />
  );
}
