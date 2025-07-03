import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRouteADM = ({ children }) => {
  const { isAuthenticated, auth } = useAuth();

  return isAuthenticated & auth=='admin' ? children : <Navigate to="/" />;

};

export default PrivateRouteADM;