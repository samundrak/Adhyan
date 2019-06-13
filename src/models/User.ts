import FirestoreModel from './FirestoreModel';

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
}

export default User;
