import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const HomeContext = createContext(null);

// Proveedor de datos del usuario
export const HomeProvider = ({ children }) => {
  const [filterDate, setFilterDate] = useState({ start: "01/11/2024", end: "30/11/2024", periodName: "semana", id: 2 });
  const [filterBranch, setFilterBranch] = useState({id: null, name: ""});
  const [filterProduct, setFilterProduct] = useState({id: null, name: "", photo: ""});
  const [filterStaff, setFilterStaff] = useState({id: null, name: ""});

  return (
    <HomeContext.Provider value={{ filterDate, filterBranch, filterProduct, filterStaff,
                                   setFilterDate, setFilterBranch, setFilterProduct, setFilterStaff }}>
      {children}
    </HomeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useHome = () => {
  return useContext(HomeContext);
};
