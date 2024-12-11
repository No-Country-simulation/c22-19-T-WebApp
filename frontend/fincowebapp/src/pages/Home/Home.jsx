import { useState, useEffect } from "react";
import axios from 'axios';
import { Header, CardWelcome, SearchBar, Card_ventas_sucursales, Card_ventas_productos } from "../../components/";
import { useHome } from "../../context/HomeContext";

export const Home = () => {
  const [currentUser, setCurrentUser] = useState({ username: 'Default' });
  const [currentBranches, setCurrentBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [currentSales, setCurrentSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('building');
  const [currentSalesTotal, setCurrentSalesTotal] = useState(0);
  const [prevSalesTotal, setPrevSalesTotal] = useState(0);

  const { filterDate } = useHome();

  

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

  const getBranchesData = async () => {
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
      setCurrentBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches data:", error);
    }
  };

  const getCurrentUser = () => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")))
    
  }

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([getSalesData(), getBranchesData()]);
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
    if (currentBranches.length && currentSales.length) {
      const updatedFilteredBranches = currentBranches.map(branch => {
        const salesById = currentSales.filter(sale => sale.sucursal === branch.id);
        const totalSales = salesById.reduce((sum, sale) => sum + parseFloat(sale.total), 0);
        return {
          id: branch.id,
          name: branch.nombre,
          city: branch.ciudad.nombre,
          salesByPeriod: totalSales.toFixed(2),
        };
      });
      //console.log(searchText)
      const filteredByText = updatedFilteredBranches.filter(branch => branch.name.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredBranches(filteredByText);
    }
  }, [currentBranches, currentSales, searchText]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  //console.log(currentSalesTotal, prevSalesTotal)

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

        {filteredBranches.map((branch, index) => {
          let objetivoVentas = 1000;
          if (filterDate.periodName == 'semana'){
            objetivoVentas = 250;
          }
          if (filterDate.periodName =='mes'){
            objetivoVentas = 1500;
          }
          if (filterDate.periodName =='año'){
            objetivoVentas = 20000;
          }
          return (
          <Card_ventas_sucursales
            key={`branch_${branch.id}`}
            sucursal={branch.name}
            localidad= {branch.city}
            ventas={branch.salesByPeriod}
            objetivo_ventas={objetivoVentas}
          />
          )}
        )}
        <Card_ventas_productos 
          nombre="Linterna"
          categoria="Herramientas"
          ventas={154}
          objetivo_ventas={300}
        />
      </main>

    </>
  );
};
