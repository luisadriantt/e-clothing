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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // group all calls into one request
  const batch = firestore.batch();
  // use forEach instead of map because dont return a new array like map
  objectsToAdd.forEach((obj) => {
    const newDocFerf = collectionRef.doc(); // returns a new id gernerated by firebase
    batch.set(newDocFerf, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  // ".docs" will return the querysnapshot array!!!!
  const transformedCollection = collectionsSnapshot.docs.map((doc) => {
    // querysnapshot data
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  /* 
  Returns a map of the collection using
  the reduce function where the -key- is
  the collection title in lower case and
  the -value- is the collection of that
  item
  */
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      unsuscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const getUserCartRef = async (userId) => {
  const cartsRef = firestore
    .collection("user-cartItems")
    .where("userId", "==", userId);

  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection("user-cartItems").doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
