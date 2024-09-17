import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
