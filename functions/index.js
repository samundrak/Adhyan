const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
// exports.generateContent = functions.storage
//   .object()
//   .onFinalize(async (object) => {
//     console.log(object);
//     return true;
//   });
exports.generateContent = functions.firestore
  .document('users/{usersId}/books')
  .onCreate(async (change) => {
    console.log(change);
    return true;
  });
