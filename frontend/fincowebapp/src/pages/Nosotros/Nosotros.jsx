import { Header } from "../../components"
import { Link } from "react-router-dom";
import { MdClose, MdInfo } from "react-icons/md";
import './Nosotros.css';


export const Nosotros = () => {
    return (
      <>
        <Header />
        
            <div className="nosotros">
                <section className="nosotros__section">
                    <div className="nosotros-card">
                        <header className="nosotros-card__header">
                            <h3 className="nosotros-card__header__title">Equipo</h3>
                            <Link to='/'><MdClose  className="nosotros-card__header__icon"/></Link>
                        </header>
                        <div className="nosotros-card__group">
                            <h4 className="nosotros-card__group_title">Frontend</h4>
                            <ul className="nosotros-card__group_ul">
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/cesar.png" className="nosotros-card__group__image"/><p>César Hernán Ruscica</p></li>
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/elvin.png" className="nosotros-card__group__image"/><p>Elvin Moreno</p></li>
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/pedro.png" className="nosotros-card__group__image"/><p>Pedro Tarragó</p></li>
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/Tomas.png" className="nosotros-card__group__image"/><p>Tomás Villegas</p></li>                                
                            </ul>
                        </div>
                        <div className="nosotros-card__group">
                            <h4 className="nosotros-card__group_title">Backend</h4>
                            <ul className="nosotros-card__group_ul">
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/Carolina.png" className="nosotros-card__group__image"/><p>Carolina Acosta</p></li>  
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/Ignacio.png" className="nosotros-card__group__image"/><p>Ignacio Nava</p></li>  
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/Joel.png" className="nosotros-card__group__image"/><p>Joel Aguilar</p></li>  
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/leon.png" className="nosotros-card__group__image"/><p>León Mateo Cáceres</p></li>                                 
                            </ul>
                        </div>
                        <div className="nosotros-card__group">
                            <h4 className="nosotros-card__group_title">UX/UI</h4>
                            <ul className="nosotros-card__group_ul">                                
                                <li className="nosotros-card__group_li"><img src="./images/integrantes/claudia.png" className="nosotros-card__group__image"/><p>Claudia López Garcidueñas</p></li>                 
                            </ul>
                        </div>
                        <Link to='/' className="modal_period-button" >Iniciar</Link>
                    </div>
                </section>
                <section className="nosotros__section --background-color-purple">
                    <figure>
                        <img src="./images/FincoLogo-nosotros.jpg" 
                            className="nosotros__image-logo"
                            alt="Logo de Finco Web App" 
                            title="Aplicacion 'Finco', Conecta tus finanzas" />
                    </figure>
                </section>
            </div>
        
          
      </>
      );
}