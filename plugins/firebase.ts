import {
  FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MEASUREMENT_ID, FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET
} from '@env';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY.toString(),
  authDomain: FIREBASE_AUTH_DOMAIN.toString(),
  projectId: FIREBASE_PROJECT_ID.toString(),
  storageBucket: FIREBASE_STORAGE_BUCKET.toString(),
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID.toString(),
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);

export { firebase, auth, db };

