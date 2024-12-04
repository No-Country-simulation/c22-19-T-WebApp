import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const UserContext = createContext(null);

// Proveedor de datos del usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};
