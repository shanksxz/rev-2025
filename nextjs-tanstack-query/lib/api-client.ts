import axios from "axios";

export const api = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/",
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  if (config.headers) config.headers.Accept = "application/json";
  config.withCredentials = true;
  return config;
});

api.interceptors.response.use((res) => {
  return res.data;
});
