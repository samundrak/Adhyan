import Auth from '../models/Auth';
import { SimpleControllerInterface, BookInterface } from '../interfaces';
import { collectIdsAndDocs } from '../utils';

class BooksController implements SimpleControllerInterface {
  constructor(
    public firestore: firebase.firestore.Firestore,
    public auth: Auth,
  ) {}
  createNewBook() {}

  async getBooks(): Promise<BookInterface[]> {
    if (!this.auth.user) return [];
    const booksRef = await this.auth.user.collection('books').get();
    return booksRef.docs.map(collectIdsAndDocs) as BookInterface[];
  }
}
export default BooksController;
