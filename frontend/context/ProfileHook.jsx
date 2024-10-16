import { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "../src/axios";

const ProfileHook = () => {
  const { authTokens } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const getProfile = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: `/user/profile/`,
      });
      setProfile(response.data);
      setProfileLoaded(true);
    } catch (error) {
      console.error("Cannot get user profile", error);
    }
  };

  useEffect(() => {
    if (authTokens) {
      getProfile();
    }
  }, [authTokens]);

  return { profile, setProfile, profileLoaded };
};

export default ProfileHook;
