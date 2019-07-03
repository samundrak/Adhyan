import { UploadFile } from 'antd/lib/upload/interface';
import { BOOKS_PROCESSING_STATUS } from '../consts';
import Book from '../models/Book';
import { BookInterface } from '../interfaces';

class Books {
  private book: Book;

  constructor(private firestore: firebase.firestore.Firestore) {
    this.book = new Book(this.firestore);
  }

  async createBook(
    bookItem: {
      file: UploadFile;
      uploadedItemURL: string;
    },
    userId: string,
  ): Promise<any> {
    const { file, uploadedItemURL } = bookItem;
    const filenameArr = file.name.split('.');
    const extension = filenameArr.pop();
    const filename = filenameArr.join('');

    return this.book.create({
      file: {
        name: file.name,
        size: file.size,
        url: uploadedItemURL,
        type: file.type,
      },
      name: filename,
      extension,
      status: BOOKS_PROCESSING_STATUS.PROCESSING,
      userId,
    });
  }

  async getBooksByUserId(userId: string): Promise<BookInterface[]> {
    return this.book.get('userId', '==', userId);
  }
}
export default Books;
