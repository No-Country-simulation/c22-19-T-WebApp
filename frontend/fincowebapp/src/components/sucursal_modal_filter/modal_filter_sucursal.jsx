import React from 'react';
import './modal_filter_surcusal.css'
import { FaChevronDown } from "react-icons/fa";
import { UnderConstruction } from '../../pages/UnderConstruction/UnderConstruction';
export const DialogFilter = ({ open, onClose }) => {
  if (!open) return null; // No renderizamos el modal si no está abierto

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2 className="under_contruction_title2">En construcción</h2>
      <img className="under_contruction_image" src="./images/UnderConstruction.png" alt="Imagen que ilustra una pagina web en construcción" title="En construcción" />        
      {/* <h3>Filtro por sucursal</h3>
        <button className="modal-close" onClick={onClose}>X</button>
        <div>
            <p className='tittle'>Ubicación</p>
            <p className='text'>Estado  <FaChevronDown /> </p> 
            <p className='text'>Ciudad <FaChevronDown /></p>
        </div>     
        <div>
            <p  className='tittle'>Logros</p>
            <p className='text'>Mentas</p>
            <p className='text'>Ventas</p>
        </div>     
        <button onClick={onClose}>Aplicar
       
        </button> */}
      </div>
    </div>
  );
};
