import axios from "axios";
import React from 'react';
import './PersonalDialog.css'
import { FaChevronDown, FaChevronUp, FaDiceD6, FaTrophy   } from "react-icons/fa";

import { InteractiveProgressBar } from '../ProgressBar/InteractiveProgressBar';
import {RadioSelect} from '../radio-select/RadioSelect';

import {useState, useEffect } from "react";

export const PersonalDialog = ({ open, onClose }) => {
  if (!open) return null; // No renderizamos el modal si no está abierto
  // Estado para cada flecha (Estado para "Estado" y "Ciudad")
  const [stateArrowOpen, setStateArrowOpen] = useState(false);
  const [cityArrowOpen, setCityArrowOpen] = useState(false);
  const [achievementArrowOpen, setAchievementArrowOpen] = useState(false);
  const [salesArrowOpen, setSalesArrowOpen] = useState(false);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedSCity] = useState("");

   // Estados para las barras de progreso
   const [achievementProgress, setAchievementProgress] = useState(0);
   const [salesProgress, setSalesProgress] = useState(0);
 
   // Estado para almacenar las sucursales
  const [sucursales, setSucursales] = useState([]);

   // Obtener datos del endpoint al montar el componente
   // Obtener datos del endpoint usando Axios
  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await axios.get(
          "https://c2219twebapp.pythonanywhere.com/negocio/api/v1/sucursales/",
          {
            headers: {
              "X-CSRFToken": localStorage.getItem("token"), // Token almacenado
              "Content-Type": "application/json",
            },
            withCredentials: true, // Habilitar envío de cookies
          }
        );
        setSucursales(response.data); // Almacenar las sucursales en el estado
      } catch (error) {
        console.error("Error al obtener las sucursales:", error);
      }
    };

    fetchSucursales();
  }, []); // Ejecutar al montar el componente

  // Manejador de cambios en la barra de progreso
  const handleAchievementProgressChange = (e) => {
    setAchievementProgress(Number(e.target.value));
  };

  const handleSalesProgressChange  = (e) => {
    setSalesProgress(Number(e.target.value));
  };

  const handleArrowClick = (setter) => {
    setter(prev => !prev); // Cambia el estado al hacer clic
  };

  const cityOptions = ["Maria Castillo", "Manuel Castillo", "Jose Lobo", "Ana Palacios"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Filtro por Personal</h3>
        <button className="modal-close" hidden onClick={onClose}>X</button>
        <div>
          <div className='caract'>          
          <p className='tittle'>
          <FaDiceD6 className='icon-square'/>
            Características 
            </p>
          </div>
          <div className='content-ubi'>
            <div className='estado'  onClick={() => handleArrowClick(setStateArrowOpen)}>
            <p className='text'>Sucursal</p>
            {!stateArrowOpen && selectedState && (
            <p className="elegido">Elegido</p>
              )}
            <p className='arrow'>
              {stateArrowOpen ?  <FaChevronUp />: <FaChevronDown />}
            </p>            
            </div>
            {stateArrowOpen && (
              <div className="content-dialog">
                {sucursales.map((sucursal) => (
                  <RadioSelect
                    key={sucursal.id}
                    label={sucursal.nombre}
                    name="sucursal"
                    checked={selectedState === sucursal.nombre}
                    onChange={(e) => setSelectedState(sucursal.nombre)}
                  />
                ))}
              </div>
            )}
            <div className='ciudad' onClick={() => handleArrowClick(setCityArrowOpen)} >
            <p className='text' >Nombre del Vendedor</p>
            {!stateArrowOpen && selectedCity && (
            <p className="elegido">Elegido</p>
              )}
            <p className='arrow'>
              {cityArrowOpen ? <FaChevronUp /> : <FaChevronDown />}
            </p>
            </div>
            {cityArrowOpen && (
              <div className="content-dialog">
                {cityOptions.map((option) => (
                  <RadioSelect
                    key={option}
                    label={option}
                    name="ciudad" // : todos los radio buttons comparten el mismo "name"
                    checked={selectedCity === option}
                    onChange={(e) => setSelectedSCity(option)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <p className='tittle'>
          <FaTrophy className='icon-square'/>
            Logros</p>
          <div className='content-log'>
          <div className='estado' onClick={() => handleArrowClick(setAchievementArrowOpen)}  >
            <p className='text' >Mentas</p>
            {!achievementArrowOpen && achievementProgress > 0 && (
                <p className="elegido">Elegido</p>
              )}
            <p className='arrow' >
              {achievementArrowOpen ? <FaChevronUp />: <FaChevronDown />}
            </p>           
            </div>
            {achievementArrowOpen && (
              <div className="progress-inte">
                <InteractiveProgressBar
                  value={achievementProgress}
                  onChange={handleAchievementProgressChange}
                />
              </div>
            )}
            <div className='ciudad' onClick={() => handleArrowClick(setSalesArrowOpen)} >
            <p className='text' >Ventas</p>
            {!salesArrowOpen && salesProgress > 0 && (
                <p className="elegido">Elegido</p>
              )}
            <p className='arrow' >
              {salesArrowOpen ? <FaChevronUp /> : <FaChevronDown />}
            </p>
            </div>
            {salesArrowOpen && (
              <div className="progress-inte">
                <InteractiveProgressBar
                  value={salesProgress}
                  onChange={handleSalesProgressChange}
                />
              </div>
            )}
          </div>
        </div>
        
        <button className='aplicar' onClick={onClose}>Aplicar</button>
      </div>
    </div>
  );
};