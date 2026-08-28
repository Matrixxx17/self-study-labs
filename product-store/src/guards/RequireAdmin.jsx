import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
export default function RequireAdmin({children}){
    const isAdmin = useAuthStore((s)=>s.isAdmin)
    if(!isAdmin) {
        return <Navigate to="/products" replace/>
    }
    return children
}