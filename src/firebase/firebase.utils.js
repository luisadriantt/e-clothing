import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAaacpNCzW7N5cDTkanr3ewnBRT8amJK6A",
  authDomain: "crwn-db-ea388.firebaseapp.com",
  projectId: "crwn-db-ea388",
  storageBucket: "crwn-db-ea388.appspot.com",
  messagingSenderId: "454201003096",
  appId: "1:454201003096:web:d6cb9f9095a42de947ce2d",
  measurementId: "G-PKTNLQ931C",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Query to db returns a reference object that represents the current place in the db
  // Does'nt have the data, gives info about id or path to reference
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // .get() returns an snapShot object to retrieve the actual data from the refence
  const snapShot = await userRef.get();

  // If the snapShot is null, store usere into firebase
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
