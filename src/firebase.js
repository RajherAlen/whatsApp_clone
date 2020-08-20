import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDWM-2uhEv8r0mTiUAypzSZsXxf_l7Dv-8",
  authDomain: "whatsapp-5eae3.firebaseapp.com",
  databaseURL: "https://whatsapp-5eae3.firebaseio.com",
  projectId: "whatsapp-5eae3",
  storageBucket: "whatsapp-5eae3.appspot.com",
  messagingSenderId: "857149020903",
  appId: "1:857149020903:web:59979ce757af175ee6e042",
  measurementId: "G-KJD2WWDMKE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
