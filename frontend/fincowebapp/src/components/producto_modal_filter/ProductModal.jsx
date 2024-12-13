import axios from "axios";
import React from 'react';
import './ProductDialog.css'
import { FaChevronDown, FaChevronUp, FaDiceD6, FaTrophy   } from "react-icons/fa";

import { InteractiveProgressBar } from '../ProgressBar/InteractiveProgressBar';
import {RadioSelect} from '../radio-select/RadioSelect';

import {useState, useEffect } from "react";

export const ProductDialog = ({ open, onClose }) => {
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
 
    // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);

  // Obtener datos del endpoint al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const responseToken = await axios.get("https://c2219twebapp.pythonanywhere.com/user/get-csrf/");
        const response = await axios.get(
          "https://c2219twebapp.pythonanywhere.com/negocio/api/v1/productos/",
          {
            headers: {
              "X-CSRFToken": responseToken.data.csrfToken, //localStorage.getItem("token"), // Token almacenado
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setProductos(response.data); // Actualiza el estado con los datos de productos
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

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

  const stateOptions = ["Pizzas", "Pastas", "Carnes", "Pescados"];
  const cityOptions = ["Hawaina", "Pasta blanca", "Lomo", "Bagre"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Filtro por producto</h3>
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
            <p className='text'>Categoría del producto</p>
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
            <p className='text' >Producto</p>
            {!stateArrowOpen && selectedCity && (
            <p className="elegido">Elegido</p>
              )}
            <p className='arrow'>
              {cityArrowOpen ? <FaChevronUp /> : <FaChevronDown />}
            </p>
            </div>
            {cityArrowOpen && (
              <div className="content-dialog">
                {/* Mostrar solo el título de los productos */}
                {cityArrowOpen && (
              <div className="content-dialog">
                {/* Limitar a los primeros 5 productos */}
                {productos.slice(0, 5).map((producto) => (
                  <RadioSelect
                    key={producto.id}
                    label={producto.title} // Mostrar solo el título
                    name="producto"
                    checked={selectedCity === producto.title}
                    onChange={(e) => setSelectedSCity(producto.title)}
                  />
                ))}
              </div>
            )}
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