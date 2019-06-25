import {
  StoreInterface,
  Disposable,
  SimpleControllerInterface,
} from '../interfaces';
import AuthDisposal from './dispose/AuthDisposal';
import Auth from '../models/Auth';
import User from '../models/User';
import { setUser } from '../store/actions/users';
import firebase from '../firebase';
import Book from '../models/Book';
import { UploadFile } from 'antd/lib/upload/interface';
import BooksController from '../controllers/BooksController';
import { getRandomFileName } from '../utils';

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
      this.auth.user = userRef;
      console.log(userRef);
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
      .child(getRandomFileName(file.name))
      .put(file)
      .then((response) => {
        const downloadURL = response.ref.getDownloadURL();
        return downloadURL;
      });
  }
  createController(type: string): SimpleControllerInterface | undefined {
    switch (type) {
      case 'books':
        return new BooksController(this.firestore, this.auth);
    }
  }
  async createNewBook(bookItem: { file: UploadFile; uploadedItemURL: string }) {
    if (!this.auth.auth.currentUser) return new Error('No user');
    const user = new User(this.firestore);
    return await user.createBook(bookItem, this.auth.user);
  }
  dispose() {
    this.disposableItems.forEach((item: Disposable) => {
      item.dispose();
    });
  }
}
export default Adhyan;
