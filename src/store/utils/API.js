import axios from "axios";

export const BACKEND_API = axios.create({
  baseURL: "http://api.odatransportation.com",
});

BACKEND_API.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // Add 'ngrok-skip-browser-warning' header
  // config.headers["ngrok-skip-browser-warning"] = "true";
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  // Add Content-type header
  config.headers["Content-type"] = "application/json; charset=UTF-8";

  return config;
});
