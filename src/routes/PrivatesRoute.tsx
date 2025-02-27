import { Navigate, Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";

const PrivatesRoute = () => {
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

    // Mientras se verifica la sesión, puedes mostrar un loader
    if (isAuthenticated === null) return <h1>Verificando sesión...</h1>;

    return isAuthenticated ? <Outlet /> : <Navigate to={import.meta.env.VITE_BASE_URL+"/auth/login"} />;
}

export default PrivatesRoute