import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "",
  authDomain: "crwn-db-ea388.firebaseapp.com",
  projectId: "crwn-db-ea388",
  storageBucket: "crwn-db-ea388.appspot.com",
  messagingSenderId: "454201003096",
  appId: "1:454201003096:web:d6cb9f9095a42de947ce2d",
  measurementId: "G-PKTNLQ931C",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
