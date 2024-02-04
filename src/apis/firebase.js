// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import config from "./api_key";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, databaseURL } = config;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const db = getDatabase(app);