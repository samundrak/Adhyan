import Auth from '../models/Auth';
import { SimpleControllerInterface } from '../interfaces';
import { collectIdsAndDocs } from '../utils';

class BooksController implements SimpleControllerInterface {
  constructor(
    public firestore: firebase.firestore.Firestore,
    public auth: Auth
  ) {}
  createNewBook() {}

  async getBooks() {
    const booksRef = await this.auth.user.collection('books').get();
    return booksRef.docs.map(collectIdsAndDocs);
  }
}
export default BooksController;
