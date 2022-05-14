import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBaFt7-3Wo9_yWfewbczL7hRyjdfsKUYzk",
  authDomain: "temporarychatapp.firebaseapp.com",
  projectId: "temporarychatapp",
  storageBucket: "temporarychatapp.appspot.com",
  messagingSenderId: "220608607980",
  appId: "1:220608607980:web:056fc7258eca96d15117c9",
  measurementId: "G-9RKXGWX8GS",
});

export const auth = getAuth(app);
