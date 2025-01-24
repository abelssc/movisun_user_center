import { createContext, ReactNode, useContext, useState } from "react";
import clientAxios from "../config/axios";

type User = {
    member_id: string;
    member_email: string;
    member_name: string;
    member_nickname: string;
    avatar: string;
};

type AuthContextType = {
    user: User|null;
    token: string|null;
    login: (token:string,user:User)=>void;
    logout: ()=>void;
    checkAuth: ()=>Promise<boolean>;
};


const AuthContext = createContext<AuthContextType|null>(null)

export const AuthProvider = ({children}:{children:ReactNode})=>{
    const [user,setUser] = useState<User|null>(null)
    const [token,setToken] = useState<string|null>(null)

    const login = (token:string,user:User):void=>{
        setToken(token)
        setUser(user)
        localStorage.setItem('token',token)
    }

    const logout = ():void=>{
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
    }

    const checkAuth = async (): Promise<boolean> => {
        try {
            const res = await clientAxios.get("/checkSession");
            
            if (res.data.code === 200) {
                const { token_key, user } = res.data.data;
                login(token_key, user);
                return true;  // ✅ Retorna true si está autenticado
            } else {
                logout();
                return false; // ✅ Retorna false si no está autenticado
            }
        } catch (error) {
            console.error("Error en checkAuth:", error);
            logout();
            return false;
        }
    };
    


    return (
        <AuthContext.Provider value={
            {
                user,
                token,
                login,
                logout,
                checkAuth
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ():AuthContextType=>{
    const context = useContext(AuthContext)
    if(context === null){
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}