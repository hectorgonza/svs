import { Navigate } from 'react-router-dom';
import { useMetaMask } from './MetaMaskContext';

function PrivateRoute(props) {
  const isLoggedIn = useMetaMask();
  return isLoggedIn ? props.element : <Navigate to="/login" />;
  
;
}

export default PrivateRoute;
