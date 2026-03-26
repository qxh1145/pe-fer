import axios from "axios";

const BASE_URL = "http://localhost:3001"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type" : "application/json",
    }
});

export default axiosInstance;
