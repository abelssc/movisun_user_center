import { Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"

const PrivatesRoute = () => {
    const {checkAuth} = useAuth()
    if(!checkAuth()) return <h1>Not Authorized</h1>
    return <Outlet/>
}

export default PrivatesRoute