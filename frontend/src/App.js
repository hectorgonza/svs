import { Routes,  Route, Navigate, Outlet } from 'react-router-dom';
import Auth from './Metamask/Auth';
import Home from './Views/Home';
import LoginPage from './Metamask/LoginPage';


function PrivateRoute() {
  return  Auth.isLoggedIn ? <Home/>: <Navigate to="/login" />
        

}

export default function App() {
  

    return (
      <Routes>
        
        <Route path="login" element={<LoginPage/>} ></Route>
        <Route  path="/" element={<PrivateRoute/>} ></Route>
      </Routes>
    )

}
