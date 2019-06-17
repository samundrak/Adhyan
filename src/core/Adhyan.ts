import { StoreInterface, Disposable } from '../interfaces';
import AuthDisposal from './dispose/AuthDisposal';
import Auth from '../models/Auth';
import User from '../models/User';
import { setUser } from '../store/actions/users';
import firebase from '../firebase';

class Adhyan {
  store: StoreInterface;
  firestore: firebase.firestore.Firestore;
  auth: Auth;
  disposableItems: Disposable[];
  storage: firebase.storage.Storage;

  constructor(store: StoreInterface, firestore: firebase.firestore.Firestore) {
    this.store = store;
    this.firestore = firestore;
    this.auth = new Auth(firestore);
    this.disposableItems = [];
    this.storage = firebase.storage();
  }

  listenToFireStoreEvents() {
    const unsubscribeAuth = this.auth
      .getAuth()
      .onAuthStateChanged(this.handleAuthStateChange);
    this.disposableItems.push(new AuthDisposal(unsubscribeAuth));
  }
  handleAuthStateChange = async (
    userAuth: firebase.User | null
  ): Promise<any> => {
    let user: firebase.User | null = userAuth || {};
    if (userAuth) {
      const userRef = await new User(this.firestore).createProfile(userAuth);
      if (userRef) {
        userRef.onSnapshot((snapshot) => {
          user = <firebase.User>{ uid: snapshot.id, ...snapshot.data() };
        });
      }
    }

    this.store.dispatch(setUser(user));
  };

  uploadItem(file: File): Promise<boolean> {
    const { user } = this.store.getState();
    return this.storage
      .ref()
      .child('user-uploads')
      .child(user.uid)
      .child(file.name)
      .put(file)
      .then((response) => {
        const downloadURL = response.ref.getDownloadURL();
        console.log(downloadURL);
        return downloadURL;
      });
  }
  dispose() {
    this.disposableItems.forEach((item: Disposable) => {
      item.dispose();
    });
  }
}
export default Adhyan;
