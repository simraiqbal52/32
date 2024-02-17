import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCSedvlf1hesIMvYo1gWkbnEW7fShftF1g",
  authDomain: "storytelling-169d4.firebaseapp.com",
  databaseURL: "https://storytelling-169d4-default-rtdb.firebaseio.com",
  projectId: "storytelling-169d4",
  storageBucket: "storytelling-169d4.appspot.com",
  messagingSenderId: "910719239489",
  appId: "1:910719239489:web:f4b8813c82412c88498dc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
