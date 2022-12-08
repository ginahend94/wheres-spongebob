import 'normalize-css/normalize.css';
import './style.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import loading from './DOM-Elements/loading';
import render from './functions/render';

const firebaseConfig = {
  apiKey: 'AIzaSyAjH_aY25QSQu5c2d4aqI308x4YQtXJNmo',
  authDomain: 'where-s-spongebob.firebaseapp.com',
  projectId: 'where-s-spongebob',
  storageBucket: 'where-s-spongebob.appspot.com',
  messagingSenderId: '684563980068',
  appId: '1:684563980068:web:d2d489efa82fd076d8ddb1',
  databaseURL: 'https://where-s-spongebob-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.body.append(loading);
render();
