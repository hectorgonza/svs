import { Routes,  Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Auth from './Metamask/Auth';
import Home from './Views/Home';
import LoginPage from './Metamask/LoginPage';


function PrivateRoute() {
  const [isLoggedIn] = useState(
    localStorage.getItem('loginToken') === 'userIsLoggedIn'
  );
  return  isLoggedIn ? <Home/>: <Navigate to="/login" />
        

}

export default function App() {
  

    return (
      <Routes>
        
        <Route path="home" element={<PrivateRoute/>} ></Route>
        <Route path="login" element={<LoginPage/>} ></Route>
        <Route  path="/" element={<Navigate to="/home" />} ></Route>
      </Routes>
    )

}
