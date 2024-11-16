import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    return (
        <header className="header">
          <h2>Header</h2>
          <nav>
            <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/sales">Ventas</Link></li>
                <li><Link to="/branches">Sucursales</Link></li>
                <li><Link to="/staff">Personal</Link></li>
            </ul>
          </nav>
        </header>
      );
}