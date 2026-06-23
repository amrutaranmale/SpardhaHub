import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = checking, null = none

  const load = async () => {
    const token = localStorage.getItem("sh_token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      localStorage.removeItem("sh_token");
      setUser(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const signIn = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("sh_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const signUp = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("sh_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const signOut = () => {
    localStorage.removeItem("sh_token");
    setUser(null);
  };

  const updateMe = async (payload) => {
    const { data } = await api.patch("/auth/me", payload);
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateMe, reload: load }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
