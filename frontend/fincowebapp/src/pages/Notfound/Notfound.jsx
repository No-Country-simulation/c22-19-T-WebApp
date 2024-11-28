import { Header } from "../../components"
import { Link } from "react-router-dom";
import './Notfound.css';


export const Notfound = () => {
    return (
      <>
        <Header />
        <main>
          <h2 className="not_found_title2">Ruta no encontrada</h2>
          <figure>
            <img className="not_found_image" src="./images/6325254.jpg" alt="Imagen que ilustra una pagina web en construcción" title="En construcción" />          
            <figcaption>
              Image designed by <Link to='http://www.freepik.com/'> Freepik.</Link>
            </figcaption>
          </figure>
          {/* <img src="./images/UnderConstruction.png" alt="Imagen que ilustra una pagina web en construcción" title="En construcción" />           */}
        </main>
      </>
      );
}