import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  firstName: string;
  lastName: string;
  phone: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (phone: string, password: string) => boolean;
  register: (firstName: string, lastName: string, phone: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("kalptakip-logged-in") === "true";
  });
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("kalptakip-user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem("kalptakip-logged-in", String(isLoggedIn));
    if (user) {
      localStorage.setItem("kalptakip-user", JSON.stringify(user));
    }
  }, [isLoggedIn, user]);

  const register = (firstName: string, lastName: string, phone: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("kalptakip-users") || "[]");
    const exists = users.find((u: any) => u.phone === phone);
    if (exists) return false;
    
    users.push({ firstName, lastName, phone, password });
    localStorage.setItem("kalptakip-users", JSON.stringify(users));
    
    const newUser = { firstName, lastName, phone };
    setUser(newUser);
    setIsLoggedIn(true);
    return true;
  };

  const login = (phone: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("kalptakip-users") || "[]");
    const found = users.find((u: any) => u.phone === phone && u.password === password);
    if (!found) return false;
    
    setUser({ firstName: found.firstName, lastName: found.lastName, phone: found.phone });
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("kalptakip-logged-in");
    localStorage.removeItem("kalptakip-user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
