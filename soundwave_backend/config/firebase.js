const Firebase = require('firebase/app');  // Change this to match the required Firebase module
// const FirebaseAuth = require('firebase/auth');  // Example of specific Firebase services
// const FirebaseAdmin = require('firebase-admin');

const firebaseConfig = require('../firebase_config.json')
// const serviceAccount = require('../soundwave-1d63f-firebase-adminsdk-oc12b-6ffadb5308.json');

// FirebaseAdmin.initializeApp({
//     credential: FirebaseAdmin.credential.cert(serviceAccount),
// });
Firebase.initializeApp(firebaseConfig);
const auth = getAuth();

// module.exports = { Firebase, FirebaseAdmin, FirebaseAuth };