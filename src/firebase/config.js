import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaHEJAQpX7yDxluw25BDW8D74_oYKc7m0",
  authDomain: "vue3-typescript-todo.firebaseapp.com",
  projectId: "vue3-typescript-todo",
  storageBucket: "vue3-typescript-todo.appspot.com",
  messagingSenderId: "361439863823",
  appId: "1:361439863823:web:c64a5633db6ed3d2686f7a",
  measurementId: "G-F1NBKDJ9W4"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
