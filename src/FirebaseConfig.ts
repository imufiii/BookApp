
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDed7c_i5tcLTZD8GqePKfe9xy-VKD6nFs",
  authDomain: "todoapp-cf1ca.firebaseapp.com",
  databaseURL: "https://todoapp-cf1ca-default-rtdb.firebaseio.com",
  projectId: "todoapp-cf1ca",
  storageBucket: "todoapp-cf1ca.appspot.com",
  messagingSenderId: "436065519921",
  appId: "1:436065519921:web:70560559c544895b508810"
};

const app = initializeApp(firebaseConfig);
const FIRESTORE_DB = getFirestore();

export { FIRESTORE_DB };


