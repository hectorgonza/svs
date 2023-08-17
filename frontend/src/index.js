import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { MetaMaskProvider } from './Metamask/MetaMaskContext'; // Make sure to adjust the path

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <MetaMaskProvider>
      <RemoveScrollBar />
      <App />
    </MetaMaskProvider>
  </Router>
);

reportWebVitals();

