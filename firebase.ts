import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
     apiKey: "AIzaSyDLZY8zTXomuxeRReHXSINUjAENQE-ZTB4",
     authDomain: "lab03-libraryapp.firebaseapp.com",
     projectId: "lab03-libraryapp",
     storageBucket: "lab03-libraryapp.firebasestorage.app",
     messagingSenderId: "294525174907",
     appId: "1:294525174907:web:d933e5372b5fca4f1c8ede"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);