import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
	if (config.headers) config.headers.Accept = "application/json";
	config.withCredentials = true;
	return config;
});

api.interceptors.response.use((response) => {
	return response.data;
});

export default api;
