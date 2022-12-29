import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import ClipLoader from "react-spinners/ClipLoader";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <ClipLoader />
  }

  if(user?.uid) {
    return children;
  }

  return <Navigate to="/login" state={{from:location}} replace />;
}

export default PrivateRoute;
