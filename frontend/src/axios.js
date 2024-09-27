import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//refresh the access token
const refreshAccessToken = async () => {
  try {
    const authTokens = JSON.parse(localStorage.getItem("AuthTokens"));
    // console.log(authTokens);
    const response = await axiosInstance({
      url: `/token/refresh/`,
      method: "POST",
      data: {
        refresh: authTokens.refresh,
      },
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("AuthTokens", JSON.stringify({ ...authTokens, access: newAccessToken })); // update access token
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token", error);
    throw error;
  }
};

// Add Axios request interceptor to attach the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const authTokens = JSON.parse(localStorage.getItem("AuthTokens"));
    // console.log("accessToken: ", accessToken);
    if (authTokens) {
      const accessToken = authTokens.access;
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add Axios response interceptor to handle token expiry
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // console.log(error);
    //expired token and it's not a refresh token request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; //

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // console.log("refresh access token");
        // retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (error) {
        // handle refresh token failure (e.g., redirect to login)
        console.error("Refresh token expired, redirect to login");
        setTimeout(() => {
          window.location.href = "/login";
        }, 30000);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;