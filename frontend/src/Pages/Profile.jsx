import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { authTokens } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_SERVER_URL + "/user/profile/",
        headers: {
          Authorization: `Bearer  ${authTokens.access}`,
        },
      });
      setUser(response.data);
      setIsLoading(false);
      console.log(user);
    };
    getProfile();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return <div>Profile: {JSON.stringify(user)}</div>;
};

export default Profile;
