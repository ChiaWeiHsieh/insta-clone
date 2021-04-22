import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyCxvaLDX2bYjVOIBqjI4Y59vryuJeitoxg",
    authDomain: "insta-clone-52223.firebaseapp.com",
    projectId: "insta-clone-52223",
    storageBucket: "insta-clone-52223.appspot.com",
    messagingSenderId: "378657926122",
    appId: "1:378657926122:web:fbd4df6f1f84f206736093"
};

const firebase = Firebase.initializeApp(config);


const { FieldValue } = Firebase.firestore;
console.log('firebase', firebase);

// seedDatabase(firebase);

export { firebase, FieldValue };