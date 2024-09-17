import axios from "axios";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        url: import.meta.env.VITE_SERVER_URL + "/token/",
        data: {
          username: data.email,
          password: data.password,
        },
      });
      const accessToken = response.data.access;
      setAuthTokens(response.data);
      setUser(jwtDecode(accessToken));
      localStorage.setItem("AuthTokens", JSON.stringify(authTokens));
      return response.status;
    } catch (err) {
      return err.status;
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("AuthTokens");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
