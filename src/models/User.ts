import { UploadFile } from 'antd/lib/upload/interface';
import FirestoreModel from './FirestoreModel';
import { BOOKS_PROCESSING_STATUS } from '../consts';

class User extends FirestoreModel {
  createProfile = async (user: firebase.User, additionalData?: {}) => {
    if (!user) return;

    // Get a reference to the place in the database where a user profile might be.
    const userRef = this.firestore.doc(`users/${user.uid}`);

    // Go and fetch the document from that location.
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    }

    return this.getUserDocument(user.uid);
  };
  getUserDocument = async (uid: string) => {
    if (!uid) return null;
    return this.firestore.collection('users').doc(uid);
  };

  async createBook(
    bookItem: {
      file: UploadFile;
      uploadedItemURL: string;
    },
    user: firebase.firestore.DocumentReference,
  ): Promise<any> {
    const { file, uploadedItemURL } = bookItem;
    const filenameArr = file.name.split('.');
    const extension = filenameArr.pop();
    const filename = filenameArr.join('');

    return user.collection('books').add({
      file: {
        name: file.name,
        size: file.size,
        url: uploadedItemURL,
        type: file.type,
      },
      name: filename,
      extension,
      status: BOOKS_PROCESSING_STATUS.PROCESSING,
    });
  }

  async getBooks(user: firebase.firestore.DocumentReference) {
    const booksRef = await user.collection('books').get();
    console.log(booksRef);
    // return booksRef.docs().data();
  }
}

export default User;
