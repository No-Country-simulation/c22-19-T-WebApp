import "./Card_ventas_sucursales.css";
import PropTypes from 'prop-types';



const Card_ventas_sucursales = ({ sucursal, localidad, ventas, objetivo_ventas }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="sucursal">{sucursal}</h3>
        <p className="localidad">{localidad}</p>
      </div>
      <div className="card-body">
        <p className="ventas">
          <span className="monto">${ventas}</span> / <span className="objetivo">${objetivo_ventas}</span>
        </p>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${ventas / objetivo_ventas * 100}%` }}></div>
        </div>
        <p className="porcentaje">{ventas / objetivo_ventas * 100}%</p>
      </div>
    </div>
  )
};
Card_ventas_sucursales.propTypes = {
  sucursal: PropTypes.string.isRequired,     
  localidad: PropTypes.string.isRequired,     
  ventas: PropTypes.number,          
  objetivo_ventas: PropTypes.number,
};
export default Card_ventas_sucursales
