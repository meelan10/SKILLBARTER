import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // MOCK login — replace with real API call in Step "Backend Integration"
  const login = async (email, password) => {
    const mockUser = {
      id: 1,
      name: "Aarav Sharma",
      email,
      rating: 4.8,
      reliability: 96,
    };
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const register = async (data) => {
    const mockUser = { id: 1, ...data, rating: 0, reliability: 100 };
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}