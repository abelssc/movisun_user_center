import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

type User = {
    id: string;
    email: string;
    name: string;
};

type AuthContextType = {
    user: User|null;
    token: string|null;
    login: (token:string,user:User)=>void;
    logout: ()=>void;
    checkAuth: ()=>boolean;
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

    const checkAuth = ():boolean=>{
        axios.get("http://localhost/api/user",{ withCredentials: true })
            .then(res => console.log("Usuario autenticado:", res.data))
            .catch(err => console.error("Error:", err));
    }


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