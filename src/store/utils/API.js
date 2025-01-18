import axios from "axios";

// Create an Axios instance with a base URL
export const BACKEND_API = axios.create({
  baseURL: "https://api.odatransportation.com",
});
// Add a request interceptor to modify headers before requests are sent
BACKEND_API.interceptors.request.use((config) => {
  // Get the token from sessionStorage
  const token = sessionStorage.getItem("access_token");
// console.log("token", token)
  // Add the Authorization header to the request config if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add Content-type header
  config.headers["Content-type"] = "application/json; charset=UTF-8";

  // Return the modified config
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Export the Axios instance for use in other parts of your application
export default BACKEND_API;
