import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';


const config = {
  apiKey: 'AIzaSyCz4WCF8tnHUFuiAo_ex6IVhF_S-0dhd-g',
  authDomain: 'softlab-6e579.firebaseapp.com',
  projectId: 'softlab-6e579',
  storageBucket: 'softlab-6e579.appspot.com',
  messagingSenderId: '34923867797',
  appId: '1:34923867797:web:ea933799db0ce51230b59c'
}

firebase.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
