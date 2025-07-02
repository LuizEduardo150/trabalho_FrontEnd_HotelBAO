import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useState('guest')
  const [realName, setRealName] = useState('')
  const [userName, setUserName] = useState('')

  const login = () => setIsAuthenticated(true);
  const logout = () => {
        setIsAuthenticated(false);
        setRealName("");
        setAuth("guest");
        setUserName("");
    }

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated, auth, realName, userName,
        setUserName, setRealName, setAuth, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);