
import Metamask from './Metamask/Connection';
import { Route, Navigate, Routes } from 'react-router-dom';

import Auth from './Metamask/Auth';

function App() {
  return (
    <div className="App" >
      <Routes>
      <Route
          path="/login"
          element={Auth.isLoggedIn() ? <Navigate to="/" /> : <Metamask/>}
        />
      <Route
        path="/"
        render={() => {
          // Check if the user is logged in
          if (Auth.isLoggedIn) {
            // If the user is logged in, render the specified component
            return <h1>Loggin</h1>
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
