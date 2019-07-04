// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });
// admin.firestore.se
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {
  response.send('Hello from Firebasess!');
});
exports.createNewBook = functions.firestore
  .document('books/{bookId}')
  .onCreate((snap, postId) => {
    const newValue = snap.data();
    const name = newValue.name;
    console.log(newValue);
    return;
  });
exports.createUsers = functions.firestore
  .document('posts/{postId}')
  .onWrite((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();
    process.exit();
    // access a particular field as you would any JS property

    // perform desired operations ...
  });
