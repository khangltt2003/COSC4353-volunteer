// src/context/ProfileContext.js
import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext"; // Import AuthContext to get authTokens
import axios from "../src/axios"; // Import axios instance

const ProfileContext = createContext({});
export default ProfileContext;

export const ProfileProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const getProfile = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/user/profile/`,
      });
      setProfile(response.data);
      setProfileLoaded(true);
    } catch (error) {
      console.error("Cannot fetch user profile", error);
      setProfileLoaded(true);
    }
  };

  useEffect(() => {
    if (authTokens) {
      getProfile(); // fetch profile only if tokens are present
    } else {
      setProfile(null); // reset profile if no tokens (logged out)
      setProfileLoaded(false);
    }
  }, [authTokens]);

  let contextData = {
    profile,
    profileLoaded,
    getProfile,
  };

  return <ProfileContext.Provider value={contextData}>{children}</ProfileContext.Provider>;
};
