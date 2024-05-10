import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBf43O3qRlHA5lhs3lYtfPZdhvpNGteZhg',
  authDomain: 'af-assignment-2-343a3.firebaseapp.com',
  projectId: 'af-assignment-2-343a3',
  storageBucket: 'af-assignment-2-343a3.appspot.com',
  messagingSenderId: '732371804723',
  appId: '1:732371804723:web:aa7ff3ba9218ecf5947946',
  measurementId: 'G-NTNLD0EQ1J',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
