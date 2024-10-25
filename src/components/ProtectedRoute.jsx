import { Navigate } from 'react-router-dom';
import store from '../state/store';

const ProtectedRoute = ({ children }) => {
  const user = store((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
