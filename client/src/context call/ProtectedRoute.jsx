import { useContext } from "react";
import { AuthContext } from "./Context";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({children}) => {
  const { isLoggedin } = useContext(AuthContext);

  if (isLoggedin === null) return <h2>Loading...</h2>;

  return isLoggedin ? children  : <Navigate to={"/login"} />;
};


export default ProtectRoute;
