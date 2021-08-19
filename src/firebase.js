import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyB8RwNFr2JKNJAbn1FlGL9B4qdfdlX3Gk0',
  authDomain: 'tiketapui3.firebaseapp.com',
  databaseURL: 'https://tiketapui3-default-rtdb.firebaseio.com',
  projectId: 'tiketapui3',
  storageBucket: 'tiketapui3.appspot.com',
  messagingSenderId: '629936140327',
  appId: '1:629936140327:web:4bcfc057b5bd4cb4cd5e02',
  measurementId: 'G-5MN9RBTZDQ',
});

export const auth = app.auth();
export default app;
