// ============================================================
// index.js – React Application Entry Point
// File: client/src/index.js
// ============================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mount the React app to the #root div in public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
