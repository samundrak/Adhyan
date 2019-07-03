import FirestoreModel from './FirestoreModel';
import { collectIdsAndDocs } from '../utils';
import { BookInterface } from '../interfaces';

export type BookType = {
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
};
class Book extends FirestoreModel {
  name: string = 'books';

  create(data: BookType) {
    return this.firestore.collection(this.name).add(data);
  }
  async get<T extends keyof BookType>(
    field: T,
    comparator: string,
    value: string | number | boolean,
  ): Promise<BookInterface[]> {
    const books = await this.firestore
      .collection(this.name)
      .where(field, comparator, value)
      .get();

    return books.docs.map(collectIdsAndDocs) as BookInterface[];
  }
}
export default Book;
