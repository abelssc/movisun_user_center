import axios from "axios";

const clientAxios = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'withCredentials': true,
        },
    }
)
clientAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// si el token no es valido, redirigir a login
clientAxios.interceptors.response.use(response => response,
    error => {
        //401: Unauthorized - No autorizado - Token invalido o expirado 
        if (error.response.status === 401 && error.config.url !== '/api/login') {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);


export default clientAxios;