import Auth from '../models/Auth';
import Upload from '../services/Upload';
import { UploadFile } from 'antd/lib/upload/interface';
import Books from '../services/Books';

class UploadController {
  uploadService: Upload;

  constructor(
    private firestore: firebase.firestore.Firestore,
    private auth: Auth,
    private storage: firebase.storage.Storage,
  ) {
    this.uploadService = new Upload(this.storage);
  }

  async createNewBook(file: UploadFile, userId: string) {
    const uploadedItemURL: string = await this.uploadService.uploadNewFile(
      file,
      userId,
    );
    const bookService = new Books(this.firestore);
    return bookService.createBook(
      {
        file,
        uploadedItemURL,
      },
      userId,
    );
  }
}
export default UploadController;
