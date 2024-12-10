import { Link,useNavigate  } from "react-router-dom";
import "./Header.css";
import { FaHome,FaRegBuilding,FaUserTie,FaList,FaRegBell,FaSignOutAlt    } from "react-icons/fa";
import LOGO from "../../assets/Logo.png";
import { MdOutlineNotifications } from "react-icons/md";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";


export const Header = () => {

  const { logout } = useAuth();

  const navigate = useNavigate();
  
  const handleLogout = () => {
    const isLogout = logout()
    if (isLogout) return navigate("/login"); 
    alert('No se pudo llevar a cabo el logout')
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    if (!usuario) {
      navigate("/login"); 
    }
  }, [navigate]);
  
  return (
        <aside className="aside">
         
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
                       
   <button onClick={()=> handleLogout()}>
            <i><FaSignOutAlt /></i>Cerrar sesión
          </button>
                      <Link to="/staff"><i><FaUserTie/></i>Mi cuenta</Link>
                          </div>
                  

            
          </nav>
        </aside>
      );
}