// import Auth from '../models/Auth';
interface IAuth {
  signin: (provider: string) => void;
  signout: () => void;
  getAuth: () => void;
}

interface StoreInterface {
  getState(): StateInterface;
  dispatch(arg: any): any;
}

interface Disposable {
  dispose(): void;
}
interface FirestoreModelContract {
  new (firestore: firebase.firestore.Firestore): any;
}
interface UserInterface {
  displayName: string;
  photoURL: string;
  createdAt: Date | null;
  uid: string;
}
interface GlobalInterface {
  loading: boolean;
}
interface StateInterface {
  user: UserInterface;
  global: GlobalInterface;
}
interface BookInterface {
  id: string;
  file: {
    type: string;
    name: string;
    size: number;
    url: string;
  };
  status: string;
}

interface SimpleControllerInterface {
  firestore: firebase.firestore.Firestore;
  auth: ReturnType<typeof IAuth>;
}
