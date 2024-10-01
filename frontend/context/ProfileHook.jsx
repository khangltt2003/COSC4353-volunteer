import { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "../src/axios";

const ProfileHook = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios({
          method: "GET",
          url: `${import.meta.env.REACT_APP_API_BASE_URL}/user/profile/`,
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        });

        if (response.status === 200) {
          let data = await response.json();
          setProfile(data);
        } else if (response.status === 401) {
          logoutUser();
        }
        setProfileLoaded(true); // Indicates the profile fetch attempt was made
      } catch (error) {
        console.error("An error occurred while fetching the profile:", error);
        setProfileLoaded(true);
      }
    };

    if (authTokens) {
      getProfile();
    }
  }, [authTokens, logoutUser]);

  return { profile, profileLoaded };
};

export default ProfileHook;
