import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './App.scss';
import {
      BrowserRouter,
      createBrowserRouter,
      RouterProvider,
    } from "react-router-dom";
import Home from './Views/Home';
import LoginPage from './Metamask/LoginPage';


//     const router = createBrowserRouter([
//       {
//         path: "/",
//         element: <LoginPage />,
        
//         children: [
//           {
//             path: "home",
//             element: <Home />,
            
//           },
//         ],
//       },
//     ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      //<RouterProvider router={router} />
      <BrowserRouter><App/></BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
