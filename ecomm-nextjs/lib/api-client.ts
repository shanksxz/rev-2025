import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

api.interceptors.response.use((response) => {
    return response.data;
});
