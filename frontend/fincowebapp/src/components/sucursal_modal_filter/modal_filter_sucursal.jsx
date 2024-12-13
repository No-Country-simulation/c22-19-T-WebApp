import React, { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de importar Axios
import "./modal_filter_surcusal.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { InteractiveProgressBar } from "../ProgressBar/InteractiveProgressBar";
import { RadioSelect } from "../radio-select/RadioSelect";

export const DialogFilter = ({ open, onClose }) => {
  if (!open) return null;

  // Estado para manejar la apertura de secciones
  const [stateArrowOpen, setStateArrowOpen] = useState(false);
  const [cityArrowOpen, setCityArrowOpen] = useState(false);
  const [achievementArrowOpen, setAchievementArrowOpen] = useState(false);
  const [salesArrowOpen, setSalesArrowOpen] = useState(false);

  // Estado para manejar las opciones seleccionadas
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Estados para sucursales, provincias y ciudades
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  // Estados para las barras de progreso
  const [achievementProgress, setAchievementProgress] = useState(0);
  const [salesProgress, setSalesProgress] = useState(0);

  // Obtener datos del endpoint al montar el componente
  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const responseToken = await axios.get("https://c2219twebapp.pythonanywhere.com/user/get-csrf/");
        const response = await axios.get(
          "https://c2219twebapp.pythonanywhere.com/negocio/api/v1/sucursales/",
          {
            headers: {
              "X-CSRFToken": responseToken.data.csrfToken, // localStorage.getItem("token"), // Token almacenado
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // Extraer provincias y ciudades únicas
        const sucursales = response.data;
        const uniqueProvincias = [
          ...new Map(
            sucursales.map((sucursal) => [sucursal.provincia.id, sucursal.provincia])
          ).values(),
        ];
        const uniqueCiudades = [
          ...new Map(
            sucursales.map((sucursal) => [sucursal.ciudad.id, sucursal.ciudad])
          ).values(),
        ];

        setProvincias(uniqueProvincias);
        setCiudades(uniqueCiudades);
      } catch (error) {
        console.error("Error al obtener las sucursales:", error);
      }
    };

    fetchSucursales();
  }, []);

  const handleAchievementProgressChange = (e) => {
    setAchievementProgress(Number(e.target.value));
  };

  const handleSalesProgressChange = (e) => {
    setSalesProgress(Number(e.target.value));
  };

  const handleArrowClick = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Filtro por sucursal</h3>
        <button className="modal-close" onClick={onClose}>
          X
        </button>

        <div>
          <p className="tittle">Ubicación</p>
          <div className="content-ubi">
            {/* Provincias */}
            <div
              className="estado"
              onClick={() => handleArrowClick(setStateArrowOpen)}
            >
              <p className="text">Provincia</p>
              {!stateArrowOpen && selectedState && (
                <p className="elegido">Elegido</p>
              )}
              <p className="arrow">
                {stateArrowOpen ? <FaChevronUp /> : <FaChevronDown />}
              </p>
            </div>
            {stateArrowOpen && (
              <div className="content-dialog">
                {provincias.map((provincia) => (
                  <RadioSelect
                    key={provincia.id}
                    label={provincia.nombre}
                    name="provincia"
                    checked={selectedState === provincia.nombre}
                    onChange={(e) => setSelectedState(provincia.nombre)}
                  />
                ))}
              </div>
            )}

            {/* Ciudades */}
            <div
              className="ciudad"
              onClick={() => handleArrowClick(setCityArrowOpen)}
            >
              <p className="text">Ciudad</p>
              {!cityArrowOpen && selectedCity && (
                <p className="elegido">Elegido</p>
              )}
              <p className="arrow">
                {cityArrowOpen ? <FaChevronUp /> : <FaChevronDown />}
              </p>
            </div>
            {cityArrowOpen && (
              <div className="content-dialog">
                {ciudades.map((ciudad) => (
                  <RadioSelect
                    key={ciudad.id}
                    label={ciudad.nombre}
                    name="ciudad"
                    checked={selectedCity === ciudad.nombre}
                    onChange={(e) => setSelectedCity(ciudad.nombre)}
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
        
        <button className='aplicar' onClick={onClose}>
          Aplicar
          </button>
      </div>
    </div>
  );
};