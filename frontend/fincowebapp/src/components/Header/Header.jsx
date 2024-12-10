import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaHome, FaRegBuilding, FaUserTie, FaList, FaRegBell, FaSignOutAlt } from "react-icons/fa";
import LOGO from "../../assets/Logo.png";
import { MdOutlineNotifications } from "react-icons/md";
import { useEffect, useState } from "react";
export const Header = () => {


  const [abrirP, setAbrirP] = useState(false)



  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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

          <Link to="/"><i><FaHome /></i>Home</Link>

          <Link to="/branches"><i><FaRegBuilding /></i>Sucursales</Link>

          <Link to="/staff"><i><FaUserTie /></i>Personal</Link>

        </div>
        <div className="navbar-child-second">


          <button onClick={() => setAbrirP(!abrirP)}> <i><FaUserTie /></i>Mi cuenta</button>


        </div>

        {abrirP && (
          <>
            <div className="box-logout">
              <div className="box-logout-close">
                <button onClick={() => setAbrirP(!abrirP)}>X</button>
              </div>
              <div className="box-logout-icon">
                <i><FaUserTie></FaUserTie></i>
              </div>
              <div className="box-logout-email">
                Correo@gmail.com
              </div>
              <div className="box-logout-button">
                <button onClick={() => logout()}>
                  Cerrar sesión
                </button>
              </div>
            </div>

          </>
        )}

      </nav>
    </aside>
  );
}