import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { authTokens, user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { profile, profileLoaded } = ProfileHook();

  useEffect(() => {
    const getProfile = async () => {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_SERVER_URL + "/user/profile/",
        headers: {
          Authorization: `Bearer  ${authTokens.access}`,
        },
      });
      setProfile(response.data);
      setIsLoading(false);
      console.log(user);
    };
    getProfile();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return <div>Profile: {JSON.stringify(profile)}</div>;
};

export default Profile;
