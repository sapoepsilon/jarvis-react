import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};
firebase.initializeApp(firebaseConfig);
const firebase_db = firebase.firestore();

export default firebase_db;
