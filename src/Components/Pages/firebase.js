import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDs8-Rii4V_0CSCzlKLMjnfyg0ya2bp-yc",
  authDomain: "macrohard-teams.firebaseapp.com",
  projectId: "macrohard-teams",
  storageBucket: "macrohard-teams.appspot.com",
  messagingSenderId: "638410927872",
  appId: "1:638410927872:web:7a7b8f1b2da3ff7db9cde5",
  measurementId: "G-XQ576RMZ7Z",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, storage };
export default db;
