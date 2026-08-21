import { createContext, useContext, useState, useCallback, useEffect } from "react";
import client from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("skillbarter_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  const persist = (token, user) => {
    localStorage.setItem("skillbarter_token", token);
    localStorage.setItem("skillbarter_user", JSON.stringify(user));
    setUser(user);
  };

  const login = useCallback(async (email, password) => {
    const { token, user } = await client.post("/auth/login", { email, password });
    persist(token, user);
    return user;
  }, []);

  const register = useCallback(async (payload) => {
    const { token, user } = await client.post("/auth/register", payload);
    persist(token, user);
    return user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("skillbarter_token");
    localStorage.removeItem("skillbarter_user");
    setUser(null);
  }, []);

  // On load, if a token exists, confirm it's still valid and refresh the
  // cached user (covers the case where the token expired between visits).
  useEffect(() => {
    const token = localStorage.getItem("skillbarter_token");
    if (!token) {
      setLoading(false);
      return;
    }
    client
      .get("/auth/me")
      .then((freshUser) => {
        localStorage.setItem("skillbarter_user", JSON.stringify(freshUser));
        setUser(freshUser);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
