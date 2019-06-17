export interface StoreInterface {
  getState(): StateInterface;
  dispatch(arg: any): any;
}
export interface Disposable {
  dispose(): void;
}
export interface FirestoreModelContract {
  firestore: firebase.firestore.Firestore;
}
export interface UserInterface {
  displayName: string;
  photoURL: string;
  createdAt: Date | null;
  uid: string;
}
export interface StateInterface {
  user: UserInterface;
}
