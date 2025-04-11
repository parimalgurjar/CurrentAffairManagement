// src/utils/auth.js
import { jwtDecode as jwt_decode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp && decoded.exp > currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwt_decode(token);
  } catch {
    return null;
  }
};
