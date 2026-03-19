import axios from 'axios';

const TOKEN_KEY = '@frontinn:token';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    }
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== 'undefined' && error.response?.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem('@frontinn:user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
