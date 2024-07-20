import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";

const AuthContext = createContext();

function Authprovider({ children }) {
  const [loggedUser, setLoggedUser] = useState();
  const [isAuthenticated, setAuthenticated] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/currentUser", {
          withCredentials: true,
        });
        const userData = response.data;
        setLoggedUser(userData);
        setAuthenticated(true);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedUser, setLoggedUser, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthUser() {
  const context = useContext(AuthContext);
  return context;
}

export { Authprovider, useAuthUser };
