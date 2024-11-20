
import { Header, CardWelcome } from "../../components/"
import { fakeUser } from "../../utils/data";
import { SearchBar } from "../../components/filter/SearchBar";
import Card_ventas_sucursales from "../../components/Card_ventas_sucursales/Card_ventas_sucursales";

export const Home = () => {
    return (
      <>
        <Header />
        <main>
          <h2>Home</h2>
          <p>Esta es la pagina de home</p>

          <SearchBar></SearchBar>

          <CardWelcome 
            name={fakeUser.nombre}
            salesValue = {192065}
            salesValuePrev = {132000}
          />
          <Card_ventas_sucursales
          sucursal="Constitución"
          localidad="Colima"
          ventas={700}
          objetivo_ventas={1000}
          />

        </main>
      </>
      );
}
