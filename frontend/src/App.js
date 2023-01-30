import { Routes,  Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import    CreateElection from './Views/CreateElection';
import Home from './Views/Home';
import NotFound from './Views/NotFound';
import LoginPage from './Metamask/LoginPage';

function PrivateRoute(props) {
  const [isLoggedIn] = useState(
    localStorage.getItem('loginToken') === 'userIsLoggedIn'
  );
  return  isLoggedIn ? props.element : <Navigate to="/login" />
        

}

export default function App() {
  

    return (
      <Routes>
        <Route  path="/" element={<PrivateRoute  element={<Home/>}/>} ></Route>

        
          <Route path="/election" element={<PrivateRoute  element={<CreateElection/>}/>} />
        
        <Route path="/login" element={<LoginPage/>} ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    )

}


