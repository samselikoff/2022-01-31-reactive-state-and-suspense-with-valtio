import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

if (typeof window !== "undefined") {
  // Replace with your config to try it out!
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

  window.signin = (username, password) =>
    // Replace with one of your Firebase auth users to easily signin/signout
    signInWithEmailAndPassword(auth, "frodo@theshire.com", "1234abcd");

  window.signout = () => signOut(auth);
}
