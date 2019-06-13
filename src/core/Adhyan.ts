import { StoreInterface, Disposable } from '../interfaces';
import AuthDisposal from './dispose/AuthDisposal';
import Auth from '../models/Auth';
import User from '../models/User';
import { setUser } from '../store/actions/users';

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
  handleAuthStateChange = async (
    userAuth: firebase.User | null
  ): Promise<any> => {
    let user: firebase.User | null = userAuth;
    if (userAuth) {
      const userRef = await new User(this.firestore).createProfile(userAuth);
      if (userRef) {
        userRef.onSnapshot((snapshot) => {
          console.log(snapshot);
          // this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
          user = <firebase.User>{ uid: snapshot.id, ...snapshot.data() };
        });
      }
    }

    this.store.dispatch(setUser(user));
    // this.setState({ user: userAuth });
  };

  dispose() {
    this.disposableItems.forEach((item: Disposable) => {
      item.dispose();
    });
  }
}
export default Adhyan;
