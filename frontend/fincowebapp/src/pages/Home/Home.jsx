import { Header } from "../../components/";
import Card_ventas_sucursales from "../../components/Card_ventas_sucursales/Card_ventas_sucursales";

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <h2>Home</h2>
        <p>Esta es la pagina de home</p>
      </main>
      <Card_ventas_sucursales
        sucursal="Constitución"
        localidad="Colima"
        ventas={700}
        objetivo_ventas={1000}
      />
    </>
  );
};
