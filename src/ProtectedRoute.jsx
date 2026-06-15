import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext'

function ProtectedRoute({ children }) {

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");
// console.log("token: ",token);
if (!user || !token) {
        console.log("token: ",token);
        
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;