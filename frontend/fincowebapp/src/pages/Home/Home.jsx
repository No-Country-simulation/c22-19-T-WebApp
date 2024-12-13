import { useState, useEffect } from "react";
import axios from 'axios';
import { Header, CardWelcome, SearchBar, Card_ventas_sucursales, Card_ventas_productos } from "../../components/";
import { useHome } from "../../context/HomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import "./Home.css"

import { useNavigate  } from "react-router-dom";

export const Home = () => {
  const [currentUser, setCurrentUser] = useState({ username: 'Default' });
  
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [currentSales, setCurrentSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('building');
  const [currentSalesTotal, setCurrentSalesTotal] = useState(0);
  const [prevSalesTotal, setPrevSalesTotal] = useState(0);

  const navigate = useNavigate();
  

  const { filterDate, branches, products, users, isDataLoaded } = useHome();  


  const renderEntities = () => {
    switch (selectedIcon) {
      case "building":
        return filteredBranches.map((branch) => {
          let objetivoVentas = 1000;
          if (filterDate.periodName === "semana") objetivoVentas = 250;
          if (filterDate.periodName === "mes") objetivoVentas = 1500;
          if (filterDate.periodName === "año") objetivoVentas = 20000;

          return (
            <Card_ventas_sucursales
              key={`branch_${branch.id}`}
              sucursal={branch.nombre}
              localidad={branch.city}
              ventas={parseFloat(branch.salesByPeriod)}
              objetivo_ventas={objetivoVentas}
            />
          );
        });

      case "shoppingBag":
        return products.map((product) => (
          <Card_ventas_sucursales
            key={`product_${product.id}`}
            localidad={product.title}            
            ventas={542}
            objetivo_ventas={1000}
          />
        ));

      case "bookReader":
        return users.map((user) => (
          <Card_ventas_sucursales
            key={`user_${user.id}`}
            localidad={user.username}
            ventas={542}
            objetivo_ventas={1000}
          />
        ));

      default:
        return null;
    }
  };

  const getSalesData = async () => {
    try {
      const response = await axios.get(
        `https://c2219twebapp.pythonanywhere.com/negocio/api/v1/ventas/?start_date=${filterDate.start}&end_date=${filterDate.end}`,
        {
          headers: {
            "X-CSRFToken": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCurrentSales(response.data);
      const totalSales = response.data.reduce((sum, sale) => sum + parseFloat(sale.total),0);      
      const randomNumber = (Math.random() * 2 - 1).toFixed(2);
      setCurrentSalesTotal(totalSales);
      setPrevSalesTotal(totalSales + totalSales * randomNumber);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) return navigate("/login")
      setCurrentUser(JSON.parse(localStorage.getItem("user")));    
  }

  const loadData = async () => {
    setLoading(true);
    try {      
      await getSalesData();
      getCurrentUser();
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();        
  }, [filterDate]);

  useEffect(() => {
    if (isDataLoaded && branches.length && currentSales.length) {
      console.log(`datos cargados en el contexto, sucursales, productos, y personal`);
      console.log( users)
      const updatedFilteredBranches = branches.map(branch => {
        const salesById = currentSales.filter(sale => sale.sucursal === branch.id);
        const totalSales = salesById.reduce((sum, sale) => sum + parseFloat(sale.total), 0);
        return {
          id: branch.id,
          name: branch.nombre,
          city: branch.ciudad.nombre,
          salesByPeriod: totalSales.toFixed(2),
        };
      });
      const filteredByText = updatedFilteredBranches.filter(branch => branch.name.toLowerCase().includes(searchText.toLowerCase()));
      console.log(filteredByText)
      setFilteredBranches(filteredByText);      
    }
  }, [branches, currentSales, searchText]);

  if (loading) {
    return <div className="Loading"><i><FontAwesomeIcon icon={faHourglassStart} shake /></i></div>;
  }

 //console.log(currentBranches, currentProducts, currentStaff )

 return (
  <>
    <Header />
    <main>
      <h2>Ventas</h2>
      <p>Visualiza las ventas realizadas.</p>

      <CardWelcome
        name={currentUser.username}
        sales={currentSalesTotal}
        prevSales={prevSalesTotal}
      />

      <SearchBar
        setSearchText={setSearchText}
        searchText={searchText}
        setSelectedIcon={setSelectedIcon}
        selectedIcon={selectedIcon}
      />

      {/* Renderizar condicionalmente según selectedIcon */}
      {selectedIcon === "building" && (
        filteredBranches.map((branch) => {
          let objetivoVentas = 1000;
          if (filterDate.periodName === "semana") {
            objetivoVentas = 250;
          } else if (filterDate.periodName === "mes") {
            objetivoVentas = 1500;
          } else if (filterDate.periodName === "año") {
            objetivoVentas = 20000;
          }

          return (
            <Card_ventas_sucursales
              key={branch.id}
              sucursal={branch.name}
              localidad={branch.city}
              ventas={parseFloat(branch.salesByPeriod)}
              objetivo_ventas={objetivoVentas}
            />
          );
        })
      )}
      
      {selectedIcon === "shoppingBag" && (
        products.map((product) => {
          let objetivoVentas = 1000;
          if (filterDate.periodName === "semana") {
            objetivoVentas = 250;
          } else if (filterDate.periodName === "mes") {
            objetivoVentas = 1500;
          } else if (filterDate.periodName === "año") {
            objetivoVentas = 20000;
          }

          return (
            <Card_ventas_sucursales
              key={product.id}
              sucursal={product.title}
              localidad={product.description}
              ventas={product.total_vendido}
              objetivo_ventas={200}
            />
          );
        })
      )}

      {selectedIcon === "bookReader" && (
        users.map((user) => {
          let objetivoVentas = 1000;
          if (filterDate.periodName === "semana") {
            objetivoVentas = 250;
          } else if (filterDate.periodName === "mes") {
            objetivoVentas = 1500;
          } else if (filterDate.periodName === "año") {
            objetivoVentas = 20000;
          }

          return (
            <Card_ventas_sucursales
              key={user.id}
              sucursal={`${user.first_name} ${user.last_name}`}
              localidad={user.sucursal.nombre}
              ventas={125}
              objetivo_ventas={200}
            />
          );
        })
      )}

    </main>
  </>
);
}
