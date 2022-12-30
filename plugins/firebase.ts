import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAHWwo8104Ql-Lp7EcYDcUYukJFLOiw1AY',
  authDomain: 'speaksmart-18d1e.firebaseapp.com',
  projectId: 'speaksmart-18d1e',
  storageBucket: 'speaksmart-18d1e.appspot.com',
  messagingSenderId: '86631189717',
  appId: '1:86631189717:web:0c637f336403be61d4a65c',
  measurementId: 'G-128DJE4EJX'
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);

export { firebase, auth, db };

