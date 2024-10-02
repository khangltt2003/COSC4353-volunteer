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
    if (!authTokens) {
      throw new Error("No refresh token available");
    }

    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_SERVER_URL}/token/refresh/`,
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
    //expired access token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // console.log("refresh access token");
        // retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshTokenError) {
        // handle refresh token failure (e.g., redirect to login)
        console.error("Refresh token expired, redirect to login");
        localStorage.removeItem("AuthTokens");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
        return Promise.reject(refreshTokenError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
