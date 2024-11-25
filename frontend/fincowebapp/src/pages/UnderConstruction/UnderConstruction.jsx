import { Header } from "../../components"
import './UnderConstruction.css';

export const UnderConstruction = () => {
    return (
      <>
        <Header />
        <main>
          <h2 className="under_contruction_title2">En construcción</h2>
          <img className="under_contruction_image" src="./images/UnderConstruction.png" alt="Imagen que ilustra una pagina web en construcción" title="En construcción" />          
        </main>
      </>
      );
}