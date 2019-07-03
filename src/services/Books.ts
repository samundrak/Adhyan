import { UploadFile } from 'antd/lib/upload/interface';
import { BOOKS_PROCESSING_STATUS } from '../consts';
import Book from '../models/Book';

class Books {
  constructor(
    private firestore: firebase.firestore.Firestore,
    private books: Book,
  ) {}

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

    return this.books.create({
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
}
export default Books;
