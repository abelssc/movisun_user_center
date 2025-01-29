import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';


const PublicRoutes = () => {
    const {checkAuth,token} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const verificarSesion = async () => {
            if (!token) {
                const auth = await checkAuth();
                setIsAuthenticated(auth);
            } else {
                setIsAuthenticated(true);
            }
        };
        verificarSesion();
    }, [token, checkAuth]);

    if (isAuthenticated === null) return <h1>Verificando sesión...</h1>;
    if(isAuthenticated) return <Navigate to={import.meta.env.VITE_BASE_URL} />;
    return <Outlet />;
}

export default PublicRoutes