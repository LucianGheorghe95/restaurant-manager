import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function loginWithToken(t) {
    localStorage.setItem("token", t);
    setToken(t);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const value = useMemo(() => ({
    token,
    isAuthed: Boolean(token),
    loginWithToken,
    logout
  }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
