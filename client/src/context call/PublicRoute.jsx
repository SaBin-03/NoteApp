import { useContext, useEffect } from "react";
import { AuthContext } from "./Context";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isLoggedin } = useContext(AuthContext);

  if (isLoggedin === null) return <h2>Loading...</h2>;
  if (isLoggedin) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};

export default PublicRoute;
