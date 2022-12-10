
import Metamask from './Metamask/Connection';
import { Route, Navigate, Routes, Router } from 'react-router-dom';

import Auth from './Metamask/Auth';

function App() {
  return (
    <div className="App" >
      <Routes>
        <Route
        path="/login"
        render={() => {
          // Check if the user is logged in
          if (Auth.isLoggedIn()) {
            // If the user is logged in, render the specified component
            return <Navigate to="/" />
          } else {
            // If the user is not logged in, redirect to the login page
            return <Metamask/>
          }
        }}
      />
      <Route
        path="/"
        render={() => {
          // Check if the user is logged in
          if (Auth.isLoggedIn()) {
            // If the user is logged in, render the specified component
            //return <>
          } else {
            // If the user is not logged in, redirect to the login page
            return <Navigate to="/login" />;
          }
        }}
      />
    </Routes>
    </div>
  );
}

export default App;
