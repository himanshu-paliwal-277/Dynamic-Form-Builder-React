import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage (or wherever you store it)
        const token = localStorage.getItem("token"); // Adjust if stored differently

        // If token exists, add it to the Authorization header
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle the error before the request is sent
        return Promise.reject(error);
    }
);


export default axiosInstance;
