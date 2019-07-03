import { getRandomFileName } from '../utils';
import { UploadFile } from 'antd/lib/upload/interface';

class Upload {
  constructor(private storage: firebase.storage.Storage) {}

  uploadNewFile(file: UploadFile, userId: string): Promise<string> {
    return this.storage
      .ref()
      .child('user-uploads') // should not be static
      .child(userId)
      .child(getRandomFileName(file.name))
      .put(file)
      .then(response => {
        const downloadURL = response.ref.getDownloadURL();
        return downloadURL;
      });
  }
}
export default Upload;
