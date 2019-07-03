import FirestoreModel from './FirestoreModel';
import { firestore } from '../firebase';

class Book extends FirestoreModel {
  name: string = 'books';

  create(data: {
    file: {
      name: string;
      size: number;
      url: string;
      type: string;
    };
    name: string;
    extension: string | undefined;
    status: string;
    userId: string;
  }) {
    console.log(data);
    // return this.firestore.collection(this.name).add(data);
  }
  all() {
    // return firestore.collection(this.name).where('userIdD').get();
  }
}
export default Book;
