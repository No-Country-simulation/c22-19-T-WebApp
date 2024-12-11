import { FaFilter, FaBuilding, FaShoppingBag, FaBookReader } from "react-icons/fa";
import {useState} from "react";

import './SearchBar.css';
import { DialogFilter } from "../sucursal_modal_filter/modal_filter_sucursal";
import { useHome } from "../../context/HomeContext";

export function SearchBar({ setSearchText, searchText,  setSelectedIcon, selectedIcon }){
    
    const { filterDate } = useHome();
    const handleClick = (iconName) => {        
        setSelectedIcon(iconName);
    }
    
    const handleImputChange = (event) => {
        setSearchText(event.target.value);
    }

    //abrir modal
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div className="searchBar-Filter">
        <header className="searchBar-Filter__header">
            <h2 className="searchBar-filter__title">{`Ventas ${filterDate.periodName} por categoría`}</h2>
            <p>Filtra las ventas por sucursal, producto o persona</p>
        </header>
        <div className="searchBar-Icon">
          <div
            className={`searchBar-item ${
              selectedIcon === "building" ? "is-selected" : ""
            }`}
            onClick={() => handleClick("building")}
          >
            <p className="searchBar-button ">
              <FaBuilding className="icon-A" />
            </p>
            <p className="searchBar-text">Sucursal</p>
          </div>
          <div
            className={`searchBar-item ${
              selectedIcon === "shoppingBag" ? "is-selected" : ""
            }`}
            onClick={() => handleClick("shoppingBag")}
          >
            <p className="searchBar-button">
              <FaShoppingBag className="icon-A" />
            </p>
            <p className="searchBar-text">Producto</p>
          </div>
          <div
            className={`searchBar-item ${
              selectedIcon === "bookReader" ? "is-selected" : ""
            }`}
            onClick={() => handleClick("bookReader")}
          >
            <p className="searchBar-button">
              <FaBookReader className="icon-A" />
            </p>
            <p className="searchBar-text">Personal</p>
          </div>
        </div>
        <div className="searchBar-Input-Filter">
          <input
            className="searchBar-Input"
            type="text"
            placeholder="Buscar..."
            value={searchText}
            onChange={handleImputChange}
          />
          <button className="searchBar-button-Filter" onClick={handleClickOpen}>
            <FaFilter className="icon" />
          </button>
          <DialogFilter open={open} onClose={handleClose}></DialogFilter>
        </div>
      </div>
    );
}