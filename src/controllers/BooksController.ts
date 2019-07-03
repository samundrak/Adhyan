import Auth from '../models/Auth';
import { SimpleControllerInterface, BookInterface } from '../interfaces';
import { collectIdsAndDocs } from '../utils';
import Books from '../services/Books';
import Book from '../models/Book';

class BooksController implements SimpleControllerInterface {
  booksService: Books;
  constructor(
    public firestore: firebase.firestore.Firestore,
    public auth: Auth,
  ) {
    this.booksService = new Books(this.firestore, new Book(this.firestore));
  }

  async getBooks(): Promise<BookInterface[]> {
    if (!this.auth.user) return [];
    const booksRef = await this.auth.user.collection('books').get();
    return booksRef.docs.map(collectIdsAndDocs) as BookInterface[];
  }
}
export default BooksController;
