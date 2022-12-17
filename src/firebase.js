import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAjH_aY25QSQu5c2d4aqI308x4YQtXJNmo',
  authDomain: 'where-s-spongebob.firebaseapp.com',
  projectId: 'where-s-spongebob',
  storageBucket: 'where-s-spongebob.appspot.com',
  messagingSenderId: '684563980068',
  appId: '1:684563980068:web:d2d489efa82fd076d8ddb1',
  // databaseURL: 'https://where-s-spongebob-default-rtdb.firebaseio.com/',
  // TEST
  databaseURL: 'http://127.0.0.1:9000/?ns=where-s-spongebob',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getChars = async () => new Promise((resolve) => {
  const characterRef = ref(db, 'characters');
  onValue(characterRef, (snap) => resolve(snap.val()));
});

export { db, getChars };
