import axios from 'axios';
// import dotenv from 'dotenv';
// import * as path from "node:path";

// dotenv.config({path: path.resolve(__dirname, '.env')});

const api = axios.create({
    baseURL: "http://cp24kp2.sit.kmutt.ac.th:3588/api",
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `${token}`;
    }
    return config;
});

export default api;