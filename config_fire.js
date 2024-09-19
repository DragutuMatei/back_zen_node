import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import admin from "firebase-admin";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.measurementId,
  appId: process.env.apiKey,
  measurementId: process.env.measurementId,
};

admin.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.measurementId,
  appId: process.env.apiKey,
  measurementId: process.env.measurementId,
})

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();
const auth_admin = admin.auth();
export { db, storage, auth, auth_admin };
