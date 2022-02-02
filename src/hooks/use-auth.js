import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
let initialCurrentUser = new Promise((r) => {
  resolve = r;
});

let state = proxy({
  currentUser: initialCurrentUser,
  get status() {
    return this.currentUser instanceof Promise
      ? "unknown"
      : this.currentUser === null
      ? "unauthenticated"
      : "authenticated";
  },
});

onAuthStateChanged(auth, (firebaseUser) => {
  resolve();
  state.currentUser = firebaseUser;
});

export default function useAuth() {
  return useSnapshot(state);
}
