import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3500/api',
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `${token}`;
    }
    return config;
});

export default api;