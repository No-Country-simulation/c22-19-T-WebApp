import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
const HomeContext = createContext(null);

// Proveedor de datos del usuario
export const HomeProvider = ({ children }) => {
  const [filterDate, setFilterDate] = useState(
    { start: "2024-11-01", 
      end: "2024-11-30", 
      periodName: "mes", 
      idSemana: 1,
      idMes: 11,
      idAño: 1,
     }
  );
  const [filterBranch, setFilterBranch] = useState({id: null, name: ""});
  const [filterProduct, setFilterProduct] = useState({id: null, name: "", photo: ""});
  const [filterStaff, setFilterStaff] = useState({id: null, name: ""});
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const loadBranchesData = async () => {
    try {
      const response = await axios.get(
        `https://c2219twebapp.pythonanywhere.com/negocio/api/v1/sucursales/`,
        {
          headers: {
            "X-CSRFToken": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches data:", error);
    }
  };

  const loadProductsData = async () => {
    try {
      const response = await axios.get(
        `https://c2219twebapp.pythonanywhere.com/negocio/api/v1/productos/`,
        {
          headers: {
            "X-CSRFToken": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  const loadUsersData = async () => {
    try {
      const response = await axios.get(
        `https://c2219twebapp.pythonanywhere.com/negocio/api/v1/usuarios/`,
        {
          headers: {
            "X-CSRFToken": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([loadBranchesData(), loadProductsData(), loadUsersData()]);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };
    loadInitialData();
  }, []); // Cargar solo una vez al iniciar

  return (
    <HomeContext.Provider value={{ 
      filterDate, 
      filterBranch, 
      filterProduct, 
      filterStaff, 
      branches, 
      products, 
      users,
      isDataLoaded,
      setFilterDate, 
      setFilterBranch, 
      setFilterProduct, 
      setFilterStaff 
    }}>
      {children}
    </HomeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useHome = () => {
  return useContext(HomeContext);
};
