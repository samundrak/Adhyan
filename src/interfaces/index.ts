export interface StoreInterface {}
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
