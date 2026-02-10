import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://noteapp-backend-nvje.onrender.com/api/auth", {
          withCredentials: true,
        });
        if(response.data.success) setisLoggedin(true);
      } catch (error) {
        setisLoggedin(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedin, setisLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};
