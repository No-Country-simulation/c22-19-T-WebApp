import { FaFilter, FaBuilding, FaShoppingBag, FaBookReader } from "react-icons/fa";
import {useState} from "react";

import './SearchBar.css';



export function SearchBar(){
    const [selected, setSelected] = useState("");

    const handleClick = (iconName) => {
        setSelected(iconName);
    }
    
    return (
        <div className="searchBar-Filter">
            <div className="searchBar-Icon">
            <div
                className={`searchBar-item ${selected === "building" ? "is-selected" : ""}`}
                onClick={() => handleClick("building")}
            >
            <p className="searchBar-button "><FaBuilding  className="icon-A" /></p>            
            <p className="searchBar-text">Sucursal</p>
            </div>
            <div
                className={`searchBar-item ${selected === "shoppingBag" ? "is-selected" : ""}`}
                onClick={() => handleClick("shoppingBag")}
            >
            <p className="searchBar-button"><FaShoppingBag className="icon-A" /></p>
            <p className="searchBar-text">Producto</p>
            </div>
            <div
                className={`searchBar-item ${selected === "bookReader" ? "is-selected" : ""}`}
                onClick={() => handleClick("bookReader")}
            >
            <p className="searchBar-button"><FaBookReader className="icon-A" /></p>
            <p className="searchBar-text">Personal</p>
            </div> 
            </div>
            <div className="searchBar-Input-Filter">
                <input className="searchBar-Input" type="text" placeholder="Buscar..."/>
                <button className="searchBar-button-Filter">
                    <FaFilter className="icon" /></button>
            </div>
        </div>
    )
}