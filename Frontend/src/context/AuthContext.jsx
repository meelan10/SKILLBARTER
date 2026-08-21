import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("skillbarter_token")) {
      setLoading(false);
      return;
    }
    apiRequest("/auth/me")
      .then(({ user: nextUser }) => setUser(nextUser))
      .catch(() => localStorage.removeItem("skillbarter_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const result = await apiRequest("/auth/login", { method: "POST", body: { email, password } });
    localStorage.setItem("skillbarter_token", result.token);
    setUser(result.user);
    return result.user;
  };

  const register = async ({ name, email, password = "password123" }) => {
    const result = await apiRequest("/auth/register", { method: "POST", body: { name, email, password } });
    localStorage.setItem("skillbarter_token", result.token);
    setUser(result.user);
    return result.user;
  };

  const loginWithGoogle = async (credential) => {
    const result = await apiRequest("/auth/google", {
      method: "POST",
      body: { credential },
    });
    localStorage.setItem("skillbarter_token", result.token);
    setUser(result.user);
    return result.user;
  };

  const logout = () => {
    localStorage.removeItem("skillbarter_token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
