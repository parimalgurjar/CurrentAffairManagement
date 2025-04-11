// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  getToken,
  isAuthenticated,
  getUserFromToken,
  logout as utilLogout,
} from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token && isAuthenticated()) {
      setUser(getUserFromToken());
      setToken(token);
    } else {
      utilLogout();
    }
    setLoading(false);
  }, []);

  const login = (newToken) => {
    if (!newToken) return;

    localStorage.setItem("token", newToken);
    const userData = getUserFromToken();
    setUser(userData);
    setToken(newToken);
  };

  const logout = () => {
    utilLogout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
