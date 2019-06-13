import firebase from 'firebase';
import { StoreInterface, Disposable } from '../interfaces';
import AuthDisposal from './dispose/AuthDisposal';
import Auth from '../models/Auth';

class Adhyan {
  store: StoreInterface;
  firestore: firebase.firestore.Firestore;
  auth: Auth;
  disposableItems: Disposable[];

  constructor(store: StoreInterface, firestore: firebase.firestore.Firestore) {
    this.store = store;
    this.firestore = firestore;
    this.auth = new Auth(firestore);
    this.disposableItems = [];
  }

  listenToFireStoreEvents() {
    const unsubscribeAuth = this.auth
      .getAuth()
      .onAuthStateChanged(this.handleAuthStateChange);
    this.disposableItems.push(new AuthDisposal(unsubscribeAuth));
  }
  handleAuthStateChange = async (userAuth: firebase.User): any => {
    if (userAuth) {
      const userRef = await this.createUserProfileDocument(userAuth);
      userRef.onSnapshot((snapshot) => {
        console.log(snapshot);
        // this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
      });
    }

    console.log(userAuth);
    // this.setState({ user: userAuth });
  };

  dispose() {
    this.disposableItems.forEach((item: Disposable) => {
      item.dispose();
    });
  }

  createUserProfileDocument = async (
    user: firebase.User,
    additionalData?: {}
  ) => {
    if (!user) return;

    // Get a reference to the place in the database where a user profile might be.
    const userRef = this.firestore.doc(`users/${user.uid}`);

    // Go and fetch the document from that location.
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.error('Error creating user', error.message);
      }
    }

    return this.getUserDocument(user.uid);
  };
  getUserDocument = async (uid: string) => {
    if (!uid) return null;
    try {
      return this.firestore.collection('users').doc(uid);
    } catch (error) {
      throw error;
    }
  };
}
export default Adhyan;
