import {
  FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MEASUREMENT_ID, FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
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

let firebase: FirebaseApp;
let auth: Auth;

if (getApps().length < 1) {
  firebase = initializeApp(firebaseConfig);
  auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  firebase = getApp();
  auth = getAuth();
}

const db = getFirestore(firebase);

export { firebase, auth, db };

