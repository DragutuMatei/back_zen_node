import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

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


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
export { db, storage };
