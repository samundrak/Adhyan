import { FirestoreModelContract } from '../interfaces';

const FirestoreModel: FirestoreModelContract = class FirestoreModel {
  constructor(public firestore: firebase.firestore.Firestore) {}
};
export default FirestoreModel;
