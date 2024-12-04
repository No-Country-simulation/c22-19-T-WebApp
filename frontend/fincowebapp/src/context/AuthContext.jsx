import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: {name: "pepe"} });

  const login = async (credentials) => {
    console.log(credentials)
    try {
      const response = await fetch("https://c2219twebapp.pythonanywhere.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      setAuth({ token: data.token, user: data.user });
      localStorage.setItem("token", data.token); // Opcional: guardar el token localmente
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
