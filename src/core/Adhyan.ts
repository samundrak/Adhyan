import AuthDisposal from './dispose/AuthDisposal';
import Auth from '../models/Auth';
import User from '../models/User';
import { setUser } from '../store/actions/users';
import firebase from '../firebase';
import { UploadFile } from 'antd/lib/upload/interface';
import BooksController from '../controllers/BooksController';
import { getRandomFileName } from '../utils';
import UploadController from '../controllers/UploadController';
import { Disposable, StoreInterface } from '../interfaces';
export enum CONTROLLERS {
  BOOKS = 'BOOKS',
  UPLOAD = 'UPLOAD',
}
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
    userAuth: firebase.User | null,
  ): Promise<any> => {
    let user: firebase.User | {} = userAuth || {};
    if (userAuth) {
      const userRef = await new User(this.firestore).createProfile(userAuth);
      this.auth.user = userRef;
      if (userRef) {
        userRef.onSnapshot(snapshot => {
          user = { uid: snapshot.id, ...snapshot.data() } as firebase.User;
          this.store.dispatch(setUser(user));
          this.auth.user = userRef;
        });
      }
    }
  };

  createController<T>(type: string) {
    switch (type) {
      case CONTROLLERS.BOOKS:
        return new BooksController(this.firestore, this.auth);
      case CONTROLLERS.UPLOAD:
        return new UploadController(this.firestore, this.auth, this.storage);
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
