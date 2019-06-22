import FirestoreModel from './FirestoreModel';
import { firestore } from '../firebase';

class Book extends FirestoreModel {
  name: string = 'books';

  all() {
    // return firestore.collection(this.name).where('userIdD').get();
  }
}
export default Book;
