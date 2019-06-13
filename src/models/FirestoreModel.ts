import { FirestoreModelContract } from '../interfaces';

class FirestoreModel implements FirestoreModelContract {
  firestore: firebase.firestore.Firestore;

  constructor(firestore: firebase.firestore.Firestore) {
    this.firestore = firestore;
  }
}
export default FirestoreModel;
