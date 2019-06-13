import FirestoreModel from './FirestoreModel';
import firebase from 'firebase';

class Auth extends FirestoreModel {
  auth: firebase.auth.Auth;

  constructor(firestore: firebase.firestore.Firestore) {
    super(firestore);
    this.auth = firebase.auth();
    this.firestore = firestore;
  }
  signin(provider: string) {
    if (provider === 'google') {
      new firebase.auth.GoogleAuthProvider();
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
