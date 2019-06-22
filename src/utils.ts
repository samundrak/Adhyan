export const collectIdsAndDocs = (doc: firebase.firestore.DocumentSnapshot) => {
  return { ...doc.data(), id: doc.id };
};
