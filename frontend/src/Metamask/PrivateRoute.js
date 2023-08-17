import { Navigate, Route } from 'react-router-dom';
import { useMetaMask } from './MetaMaskContext';

function PrivateRoute({ isTesting, ...props }) {
  const isLoggedIn = useMetaMask();
  const content = isLoggedIn ? props.element : <Navigate to="/login" />;
  
  if (isTesting) {
    return <Route {...props} element={content} />;
  }
  
  return content;
}

export default PrivateRoute;
