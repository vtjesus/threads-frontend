import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
    const auth = useSelector((state: RootState) => state.user.auth)
    return auth ? <Outlet /> : <Navigate to="/login" />
    
}

export default ProtectedRoutes