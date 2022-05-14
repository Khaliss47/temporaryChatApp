import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    
      onAuthStateChanged((user) => {
          if (user) {
            setUser(user)
            setLoading(false);
            router.push('/chats')
          }
          else {
              setLoading(false);
              router.push('/');
          }
      });
    
  }, [user, router.asPath]);

  const value = { user };

  return <AuthContext.Provider>{!loading && children}</AuthContext.Provider>;
};
