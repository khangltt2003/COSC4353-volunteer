import { createContext, useEffect, useState } from "react";
import axios from "../src/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem("AuthTokens") ? JSON.parse(localStorage.getItem("AuthTokens")) : null));
  const [user, setUser] = useState(() => (localStorage.getItem("AuthTokens") ? jwtDecode(localStorage.getItem("AuthTokens")) : null));
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/token/",
        data: {
          username: data.email,
          password: data.password,
        },
      });
      const accessToken = response.data.access;
      setAuthTokens(response.data);
      setUser(jwtDecode(accessToken));
      localStorage.setItem("AuthTokens", JSON.stringify(response.data));
      return response.status;
    } catch (err) {
      return err.status;
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("AuthTokens");
    navigate("/login");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
