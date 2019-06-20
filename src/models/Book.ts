import FirestoreModel from './FirestoreModel';
import { firestore } from '../firebase';
import { UploadFile } from 'antd/lib/upload/interface';

class Book extends FirestoreModel {
  name: string = 'books';
  firestore: firebase.firestore.Firestore;

  constructor(firestore: firebase.firestore.Firestore) {
    super(firestore);
    this.firestore = firestore;
  }
  async create(bookItem: {
    file: UploadFile;
    uploadedItemURL: string;
  }): Promise<any> {
    const { file, uploadedItemURL } = bookItem;
    const filenameArr = file.name.split('.');
    const extension = filenameArr.pop();
    const filename = filenameArr.join('');

    return firestore.collection(this.name).add({
      file: {
        name: file.name,
        size: file.size,
        url: uploadedItemURL,
        type: file.type,
      },
      name: filename,
      extension,
    });
  }

  all() {}
}
export default Book;
