import { useState, useEffect } from "react";
import axios from 'axios';
import { Header, CardWelcome, SearchBar, Card_ventas_sucursales } from "../../components/";
import { useHome } from "../../context/HomeContext";

export const Home = () => {
  const [currentUser, setCurrentUser] = useState({ username: 'Beatriz' });
  const [currentBranches, setCurrentBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [currentSales, setCurrentSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('building');

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

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([getSalesData(), getBranchesData()]);
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
      setFilteredBranches(updatedFilteredBranches);
    }
  }, [currentBranches, currentSales]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <h2>Ventas</h2>
        <p>Visualiza las ventas realizadas.</p>

        <CardWelcome
          name={currentUser.username}
          sales={currentSales}
        />

        <SearchBar
          setSearchText={setSearchText}
          searchText={searchText}
          setSelectedIcon={setSelectedIcon}
          selectedIcon={selectedIcon}
        />

        {filteredBranches.map((branch, index) => (
          <Card_ventas_sucursales
            key={`branch_${branch.id}`}
            sucursal={branch.name}
            localidad= {branch.city}
            ventas={branch.salesByPeriod}
            objetivo_ventas="1000"
          />
        ))}
      </main>
    </>
  );
};
