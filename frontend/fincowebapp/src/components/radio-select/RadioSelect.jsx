// src/components/RadioSelect.jsx
import React from "react";
import PropTypes from "prop-types";
import './RadioSelect.css'

export const RadioSelect = ({ label, name, checked, onChange }) => {
  return (
    <div className="radio-select-container">
    <label htmlFor={name} className="radio-select-label">{label}</label>
    <input
      className="input-radio"
      type="radio"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
    />
  </div>
  );
};

// PropTypes para validar las props
RadioSelect.propTypes = {
  label: PropTypes.string.isRequired, // Nombre o etiqueta para el componente
  name: PropTypes.string.isRequired,  // Nombre del radio button
  checked: PropTypes.bool,            // Estado inicial del radio button
  onChange: PropTypes.func.isRequired // Función para manejar el cambio de estado
};

// Valor por defecto para checked
RadioSelect.defaultProps = {
  checked: false
};
