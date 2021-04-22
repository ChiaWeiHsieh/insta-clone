import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';



ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
  , document.getElementById('root'));

// instagram客戶端。
//TODO: firebase資料庫建置
//TODO: react-loading-skeleton
        // tailwind
// architecture
  // => components,
  // => constants,
  // => helers,
  // => contetxt,
  // => services,
  // => pages,