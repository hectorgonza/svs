import { Routes,  Route, Navigate, useLocation  } from 'react-router-dom';
import Auth from './Metamask/Auth';
import Home from './Views/Home';
import LoginPage from './Metamask/LoginPage';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
}

export default function App() {
  const location = useLocation();

    return (
      <Routes>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/home" component={Home} />
        <Navigate from="/" to="/home" />
      
        {console.log(location.pathname)}
      </Routes>
    );
  
    

}
