export interface StoreInterface {}
export interface Disposable {
  dispose(): void;
}
export interface FirestoreModelContract {
  firestore: firebase.firestore.Firestore;
}
