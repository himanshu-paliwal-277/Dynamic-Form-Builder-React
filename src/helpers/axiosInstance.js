import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Function to check token expiration
function isTokenExpired(token) {
    if (!token) return true;

    // Decode token to extract expiration (JWT typically has a payload in the form 'header.payload.signature')
    const payload = JSON.parse(atob(token.split(".")[1])); 
    const expiry = payload.exp;

    // Check if the token is expired (expiry is in seconds, so compare with current time in seconds)
    return (Date.now() >= expiry * 1000);
}

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("config url: ", config.url);
        // Skip expiration check for login route
        if (config.url == "/api/auth/login") {
            console.log("Skipping token expiration check for login route.");
            return config;
        }
        if (config.url == "/api/auth/register") {
            console.log("Skipping token expiration check for register route.");
            return config;
        }

        // Check if the token is expired
        if (isTokenExpired(token)) {
            // If token is expired, clear it and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login"; // Adjust this path to your login page
            return Promise.reject(new Error("Token expired"));
        }

        // If token exists and is not expired, add it to the Authorization header
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle invalid tokens
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token is invalid or expired - clear token and log out user
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login"; // Adjust this path to your login page
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
