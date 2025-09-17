import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL || "http://localhost:5000/api/v1", // backend base url
    withCredentials: true, // for sending cookies if needed
});

export default api;