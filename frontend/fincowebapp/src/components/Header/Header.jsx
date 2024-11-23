import { Link } from "react-router-dom";
import "./Header.css";
import { FaHome,FaRegBuilding,FaUserTie,FaList,FaRegBell   } from "react-icons/fa";
import LOGO from "../../assets/Logo.png";
import { MdOutlineNotifications } from "react-icons/md";
export const Header = () => {
    return (
        <header className="header">
         
          <nav className="navbar" >
                  <div className="navbar-logo">
                   <img src={LOGO} alt="" />
                  </div>
                    <div className="navbar-child">
                      
                <Link to="/"><i><FaHome/></i>Home</Link>
               
                <Link to="/branches"><i><FaRegBuilding /></i>Sucursales</Link>
                
                <Link to="/staff"><i><FaUserTie/></i>Personal</Link>
                    </div>

                    <div className="navbar-child-second">
                      
                      <Link to="/"><i><FaRegBell /></i>Notificaciones</Link>
                     
                      <Link to="/branches"><i><FaList /></i>Menu</Link>
                      
                      <Link to="/staff"><i><FaUserTie/></i>Mi cuenta</Link>
                          </div>
             

            
          </nav>
        </header>
      );
}