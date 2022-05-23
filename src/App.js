import logo from './logo.svg';
import './App.scss';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Storage
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2DCBqEtBj7PRot8--c5IF3MIByWw2Qzo",
  authDomain: "zeon-shop.firebaseapp.com",
  databaseURL: 'gs://zeon-shop.appspot.com',
  projectId: "zeon-shop",
  storageBucket: "zeon-shop.appspot.com",
  messagingSenderId: "27141439708",
  appId: "1:27141439708:web:15c0ccb63306b548ab7419",
  measurementId: "G-EB4LZBW936",
  storageBucket: 'gs://zeon-shop.appspot.com'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = getApp();
const storage = getStorage(firebaseApp, "gs://my-custom-bucket");

console.log(storage);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
