
import { useState, useEffect } from "react";
import axios from 'axios';
import { Header, CardWelcome, SearchBar, Card_ventas_sucursales } from "../../components/"

export const Home = () => {
/* Esta rama la cree para poder ir integrando las diferentes cards con los datos traidos de los endpoints */

const [currentUser, setCurrentUser] = useState([]);
const [currentBranches, setCurrentBranches] = useState([]);
const [currentProducts, setCurrentProducs] = useState([]);
const [currentSales, setCurrentSales] = useState([]);
const [loading, setLoading] = useState(true);

const [filterPeriod, setFilterPeriod] = useState('mensual');
const [searchText, setSearchText] = useState('');
const [selectedIcon, SetSelectedIcon] = useState('building');

const getUserData = async () => {
  try {
    const response = await axios.get(`http://localhost:5173/data/users.json`);      
    setCurrentUser(response.data[0]);
  } catch (error) {
    console.log(error);
  }
}

const getSalesData = async () => {
  try {
    const response2 = await axios.get(`http://localhost:5173/data/sales.json`);          
    setCurrentSales(response2.data);    
  } catch (error) {
    console.log(error);
  }
}
//https://c2219twebapp.pythonanywhere.com/negocio/api/v1/sucursal/
const getBranchesData = async () => {
  try {
    const response3 = await axios.get(`http://localhost:5173/data/branches.json`);          
    setCurrentBranches(response3.data);    
  } catch (error) {
    console.log(error);
  }
}

const loadData = async () => {
  await Promise.all([getUserData(), getSalesData(), getBranchesData()]);
}

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      await loadData();
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

 if (loading) {
   return (
     <>
       Cargando...
     </>
   )
 }  
  const filteredBranches =  selectedIcon === "building"
  ? currentBranches.filter((branch) => 
    branch.sucursal.toLowerCase().includes(searchText.toLowerCase())
  ):[];
  //console.log(currentSales)

    return (
      <>
        <Header />
        <main>
          <h2>Ventas</h2>
          <p>Visualiza las ventas realizadas.</p>         

          <CardWelcome 
            name={currentUser.nombre}
            sales = {currentSales}
            period={filterPeriod}
            onChangePeriod = {setFilterPeriod}
          />

          <SearchBar 
            setSearchText = {setSearchText}
            searchText = {searchText}
            setSelectedIcon={SetSelectedIcon}
            selectedIcon={selectedIcon}
          />
          {filteredBranches.map((filteredBranch, index) => (
            <Card_ventas_sucursales 
              key={`sucursal#${index}_filteredBranch.sucursal`}
              sucursal={filteredBranch.sucursal}
              localidad={filteredBranch.localidad}
              ventas={currentSales.find(sale => sale.period == filterPeriod).salesValue}
              objetivo_ventas={filteredBranch.objetivo_ventas}
            />
          )
          )}       
        </main>
      </>
      );
}
