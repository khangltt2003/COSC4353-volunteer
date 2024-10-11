import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AdminIndicator = () => {
  const { user } = useContext(AuthContext);
  return user && user.is_staff && <div className="w-full flex justify-center text-lg bg-teal-600 text-white ">Admin View</div>;
};

export default AdminIndicator;
