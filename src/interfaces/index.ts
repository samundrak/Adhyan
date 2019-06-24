import Auth from '../models/Auth';

export interface StoreInterface {
  getState(): StateInterface;
  dispatch(arg: any): any;
}
export interface Disposable {
  dispose(): void;
}
export interface FirestoreModelContract {
  new (firestore: firebase.firestore.Firestore): any;
}
export interface UserInterface {
  displayName: string;
  photoURL: string;
  createdAt: Date | null;
  uid: string;
}
export interface GlobalInterface {
  loading: boolean;
}
export interface StateInterface {
  user: UserInterface;
  global: GlobalInterface;
}
export interface BookInterface {
  id: string;
  file: {
    type: string;
    name: string;
    size: number;
    url: string;
  };
}
export interface SimpleControllerInterface {
  firestore: firebase.firestore.Firestore;
  auth: Auth;
}
