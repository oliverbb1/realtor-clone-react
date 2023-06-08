import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAA9MN58Zb5YtAP8sq2KHunE_CaQsU-ANk",
    authDomain: "realtor-clone-react-15e36.firebaseapp.com",
    projectId: "realtor-clone-react-15e36",
    storageBucket: "realtor-clone-react-15e36.appspot.com",
    messagingSenderId: "1006379432816",
    appId: "1:1006379432816:web:fa02195e2fe11dc4e76db5"
};
initializeApp(firebaseConfig);
export const db = getFirestore()