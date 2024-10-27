import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // If token exists, add it to the Authorization header
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle invalid tokens
axiosInstance.interceptors.response.use(
    (response) => {
        // If response is successful, return it as is
        return response;
    },
    (error) => {
        // Check if error response status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            // Token is invalid or expired - clear token and log out user
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Redirect to login page or show "not logged in" message
            window.location.href = "/login"; // Adjust this path to your login page
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
