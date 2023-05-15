import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
    apiKey: "AIzaSyCZ3tzR_8T6qC1Fyx0ec2r29KVTWZ1I7ws",
    authDomain: "react.firebaseapp.com",
    projectId:"jarvis-react",
    storageBucket: "jarvis-react.appspot.com",
    messagingSenderId: "498376626311",
    appId: "1:498376626311:web:04f1787c218f3b83da6822",
    measurementId: "G-S4H1WJB6JK",
};
firebase.initializeApp(firebaseConfig);
const firebase_db = firebase.firestore();

export default firebase_db;

