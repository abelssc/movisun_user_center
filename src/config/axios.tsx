import axios from "axios";

const clientAxios = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true, 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
)
clientAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});
// si el token no es valido, redirigir a login
clientAxios.interceptors.response.use(response => response,
    error => {
        //401: Unauthorized - No autorizado - Token invalido o expirado 
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = import.meta.env.VITE_ROOT_URL+'/index.php?app=login';
        }
        return Promise.reject(error);
    }
);


export default clientAxios;