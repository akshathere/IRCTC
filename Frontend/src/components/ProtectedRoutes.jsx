
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
/*eslint-disable*/
const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
