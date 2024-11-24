
import { Header, CardWelcome } from "../../components/"
import { fakeUser } from "../../utils/data";
import { SearchBar } from "../../components/filter/SearchBar";
import Card_ventas_sucursales from "../../components/Card_ventas_sucursales/Card_ventas_sucursales";

export const Home = () => {



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

           <SearchBar></SearchBar>
          <Card_ventas_sucursales
          sucursal="Constitución"
          localidad="Colima"
          ventas={700}
          objetivo_ventas={1000}
          />
          <Card_ventas_sucursales
          sucursal="La Toscana"
          localidad="Guadalajara"
          ventas={650}
          objetivo_ventas={1000}
          />
          <Card_ventas_sucursales
          sucursal="Las Garzas"
          localidad="Monterrey"
          ventas={500}
          objetivo_ventas={1000}
          />

        </main>
      </>
      );
}
