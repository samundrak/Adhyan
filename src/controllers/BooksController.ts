import Auth from '../models/Auth';
import { BookInterface } from '../interfaces';
import { collectIdsAndDocs } from '../utils';
import Books from '../services/Books';
import Book from '../models/Book';

class BooksController {
  booksService: Books;
  constructor(
    private firestore: firebase.firestore.Firestore,
    private auth: Auth,
  ) {
    this.booksService = new Books(this.firestore);
  }

  async getBooks(userId: string): Promise<BookInterface[]> {
    if (!this.auth.user) return [];
    return this.booksService.getBooksByUserId(userId);
  }
}
export default BooksController;
