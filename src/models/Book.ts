import FirestoreModel from './FirestoreModel';

class Book extends FirestoreModel {
  name: string = 'books';

  all() {
    // return firestore.collection(this.name).where('userIdD').get();
  }
}
export default Book;
