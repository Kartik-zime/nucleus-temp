import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCboBtCj-5kEw6u1MChZWB2hytlaASMllM",
  authDomain: "zime-nucleus.firebaseapp.com",
  projectId: "zime-nucleus",
  storageBucket: "zime-nucleus.firebasestorage.app",
  messagingSenderId: "651385573990",
  appId: "1:651385573990:web:bd8cb3a0d73f83aa26d3a7",
  measurementId: "G-WKN198FFZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }; 