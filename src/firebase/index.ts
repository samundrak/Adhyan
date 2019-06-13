import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const env = process.env;

const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.REACT_APP_DATABASE_URL,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_APP_ID,
};
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
// export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
// export const signinWithGoogle = () => auth.signInWithPopup(provider);
// export const signOut = () => auth.signOut();
export const storage = () => firebase.storage();

if (process.env.NODE_ENV !== 'production') {
  window.fb = firebase;
}

export default firebase;
