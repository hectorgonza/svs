import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.scss';
import { BrowserRouter } from "react-router-dom";
import {RemoveScrollBar} from 'react-remove-scroll-bar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      //<RouterProvider router={router} />
      <BrowserRouter> <RemoveScrollBar/><App/></BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
