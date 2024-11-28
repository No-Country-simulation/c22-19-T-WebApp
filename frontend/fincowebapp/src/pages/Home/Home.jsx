
import { Header, CardWelcome } from "../../components/"
import { fakeUser } from "../../utils/data";
import { SearchBar } from "../../components/filter/SearchBar";
import Card_ventas_sucursales from "../../components/Card_ventas_sucursales/Card_ventas_sucursales";
import { useState } from "react";
export const Home = () => {

  const [searchtText, setSearchText] = useState("");
  const [selectecIcon, setSelectedIcon] = useState("");

  const cardsData = [
    { sucursal: "Constitución", localidad: "Colima", ventas: 700, objetivo_ventas: 1000 },
    { sucursal: "La Toscana", localidad: "Guadalajara", ventas: 650, objetivo_ventas: 1000 },
    { sucursal: "Las Garzas", localidad: "Monterrey", ventas: 500, objetivo_ventas: 1000 },

  ];

  const filteredCards =  selectecIcon === "building"
  ? cardsData.filter((card) => 
    card.sucursal.toLowerCase().includes(searchtText.toLowerCase())
  ):[];
    return (
      <>
        <Header />
        <main>
          <h2>Ventas</h2>
          <p>Visualiza las ventas realizadas.</p>         

          <CardWelcome 
            name={fakeUser.nombre}
            salesValue = {192065}
            salesValuePrev = {132000}
            period="mensual"
          />

           <SearchBar 
              setSearchText={setSearchText}
              setSelectedIcon={setSelectedIcon} 
           />
          
          {filteredCards.map((card, index) => (
            <Card_ventas_sucursales 
              key={index}
              sucursal={card.sucursal}
              localidad={card.localidad}
              ventas={card.ventas}
              objetivo_ventas={card.objetivo_ventas}
            />
          ))}
        </main>
      </>
      );
}
