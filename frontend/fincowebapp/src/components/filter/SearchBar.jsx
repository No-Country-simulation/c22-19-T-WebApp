import { FaFilter, FaBuilding, FaShoppingBag, FaBookReader } from "react-icons/fa";
import {useState} from "react";

import './SearchBar.css';
import { DialogFilter } from "../sucursal_modal_filter/modal_filter_sucursal";
import { ProductDialog } from "../producto_modal_filter/ProductModal";
import { PersonalDialog } from "../personal_modal_filter/PersonalDialog";

export function SearchBar({ setSearchText, searchText,  setSelectedIcon, selectedIcon }){
    
    
    const handleClick = (iconName) => {        
        setSelectedIcon(iconName);
    }
    
    const handleImputChange = (event) => {
        setSearchText(event.target.value);
    }

    //abrir modal
    const [open, setOpen] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openPersonal, setOpenPersonal] = useState(false);
  
    const handleClickOpen = () => {
        if (selectedIcon === "shoppingBag") {
            setOpenProduct(true);
        }else if (selectedIcon === "bookReader"){
            setOpenPersonal(true);
        }else  {
            setOpen(true);
        }
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleProductClose = () => {
        setOpenProduct(false);
    };

    const handlePersonalClose = () => {
        setOpenPersonal(false);
    };

    return (
        <div className="searchBar-Filter">
            <div className="searchBar-Icon">
            <div
                className={`searchBar-item ${selectedIcon === "building" ? "is-selected" : ""}`}
                onClick={() => handleClick("building")}
            >
            <p className="searchBar-button "><FaBuilding  className="icon-A" /></p>            
            <p className="searchBar-text">Sucursal</p>
            </div>
            <div
                className={`searchBar-item ${selectedIcon === "shoppingBag" ? "is-selected" : ""}`}
                onClick={() => handleClick("shoppingBag")}
            >
            <p className="searchBar-button"><FaShoppingBag className="icon-A" /></p>
            <p className="searchBar-text">Producto</p>
            </div>
            <div
                className={`searchBar-item ${selectedIcon === "bookReader" ? "is-selected" : ""}`}
                onClick={() => handleClick("bookReader")}
            >
            <p className="searchBar-button"><FaBookReader className="icon-A" /></p>
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
                <button className="searchBar-button-Filter"
                onClick={handleClickOpen}
                >
                    <FaFilter className="icon" />
                </button>
                    <DialogFilter open={open} onClose={handleClose}></DialogFilter>
                    <ProductDialog open={openProduct} onClose={handleProductClose}></ProductDialog>
                    <PersonalDialog open={openPersonal} onClose={handlePersonalClose}></PersonalDialog>
            </div>
        </div>
    )
}