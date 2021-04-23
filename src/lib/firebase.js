import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from './config';
// import { seedDatabase } from '../seed';

// choice yout api key

const firebase = Firebase.initializeApp(config);


const { FieldValue } = Firebase.firestore;
console.log('firebase', firebase);

// seedDatabase(firebase);

export { firebase, FieldValue };