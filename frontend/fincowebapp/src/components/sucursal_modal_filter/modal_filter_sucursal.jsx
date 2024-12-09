import React from 'react';
import './modal_filter_surcusal.css'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { InteractiveProgressBar } from '../ProgressBar/InteractiveProgressBar';
import {RadioSelect} from '../radio-select/RadioSelect';

import {useState} from "react";

export const DialogFilter = ({ open, onClose }) => {
  if (!open) return null; // No renderizamos el modal si no está abierto
  // Estado para cada flecha (Estado para "Estado" y "Ciudad")
  const [stateArrowOpen, setStateArrowOpen] = useState(false);
  const [cityArrowOpen, setCityArrowOpen] = useState(false);
  const [achievementArrowOpen, setAchievementArrowOpen] = useState(false);
  const [salesArrowOpen, setSalesArrowOpen] = useState(false);

  const [selectedState, setSelectedState] = useState("");

  const handleArrowClick = (setter) => {
    setter(prev => !prev); // Cambia el estado al hacer clic
  };

  const stateOptions = ["Cordoba", "Santiago", "Guadalajara", "Bogota"];
  const cityOptions = ["la palmita", "calera", "Viña del mar", "Cordoba"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Filtro por sucursal</h3>
        <button className="modal-close" onClick={onClose}>X</button>
        
        <div>
          <p className='tittle'>Ubicación</p>
          <div className='content-ubi'>
            <div className='estado'  onClick={() => handleArrowClick(setStateArrowOpen)}>
            <p className='text'>Estado</p>
            {!stateArrowOpen && selectedState && (
            <p className="elegido">Elegido</p>
              )}
            <p className='arrow'>
              {stateArrowOpen ?  <FaChevronUp />: <FaChevronDown />}
            </p>            
            </div>
            {stateArrowOpen && (
              <div className="content-dialog">
                {stateOptions.map((option) => (
                  <RadioSelect
                    key={option}
                    label={option}
                    name="estado" // : todos los radio buttons comparten el mismo "name"
                    checked={selectedState === option}
                    onChange={(e) => setSelectedState(option)}
                  />
                ))}
              </div>
            )}
            <div className='ciudad' onClick={() => handleArrowClick(setCityArrowOpen)} >
            <p className='text' >Ciudad</p>
            {!stateArrowOpen && selectedState && (
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
                    name="estado" // : todos los radio buttons comparten el mismo "name"
                    checked={selectedState === option}
                    onChange={(e) => setSelectedState(option)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <p className='tittle'>Logros</p>
          <div className='content-log'>
          <div className='estado' onClick={() => handleArrowClick(setAchievementArrowOpen)}  >
            <p className='text' >Mentas</p>
            {!stateArrowOpen && selectedState && (
            <p className="elegido">Elegido</p>
              )}
            <p className='arrow' >
              {achievementArrowOpen ? <FaChevronUp />: <FaChevronDown />}
            </p>           
            </div>
            {achievementArrowOpen && (
              <div className="progress-inte">
                 <InteractiveProgressBar></InteractiveProgressBar>
              </div>
            )}
            <div className='ciudad' onClick={() => handleArrowClick(setSalesArrowOpen)} >
            <p className='text' >Ventas</p>
            {!stateArrowOpen && selectedState && (
            <p className="elegido">Elegido</p>
              )}
            <p className='arrow' >
              {salesArrowOpen ? <FaChevronUp /> : <FaChevronDown />}
            </p>
            </div>
            {salesArrowOpen && (
              <div className="progress-inte">
                 <InteractiveProgressBar></InteractiveProgressBar>
              </div>
            )}
          </div>
        </div>
        
        <button onClick={onClose}>Aplicar</button>
      </div>
    </div>
  );
};