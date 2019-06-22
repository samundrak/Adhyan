import FirestoreModel from './FirestoreModel';
import firebase from '../firebase';
import { GOOGLE } from '../consts';
import User from './User';

class Auth extends FirestoreModel {
  auth: firebase.auth.Auth;
  user!: firebase.firestore.DocumentReference;

  constructor(public firestore: firebase.firestore.Firestore) {
    super(firestore);
    this.auth = firebase.auth();
    this.firestore = firestore;
  }
  signin(provider: string) {
    if (provider === GOOGLE) {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.auth.signInWithPopup(provider);
    }
  }
  signout() {
    this.auth.signOut();
  }

  getAuth() {
    return this.auth;
  }
}
export default Auth;
