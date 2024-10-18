import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user.is_staff ? children : <div className="min-h-screen">You do not have permission to view this page</div>;
};

export default AdminRoute;
