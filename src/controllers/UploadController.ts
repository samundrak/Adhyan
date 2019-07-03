import Auth from '../models/Auth';
import Books from '../services/Books';
import Book from '../models/Book';

class UploadController {
  booksService: Books;

  constructor(
    public firestore: firebase.firestore.Firestore,
    public auth: Auth,
  ) {
    this.booksService = new Books(this.firestore, new Book(this.firestore));
  }

  createNewBook() {}
}
export default UploadController;
