import uuid from 'uuid';

export const collectIdsAndDocs = (doc: firebase.firestore.DocumentSnapshot) => {
  return { ...doc.data(), id: doc.id };
};

export function getRandomFileName(filename: string): string {
  const fileExtension = filename.split('.').pop();
  return `${uuid()}.${fileExtension}`;
}
