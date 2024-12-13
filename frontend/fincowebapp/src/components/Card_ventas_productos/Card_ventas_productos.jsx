import "./Card_ventas_productos.css";
import PropTypes from 'prop-types';


export const Card_ventas_productos = ({ nombre, categoria, ventas, objetivo_ventas }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="nombre">{nombre}</h3>
        <p className="categoria">{categoria}</p>
      </div>
      <div className="card-body">
        <p className="ventas">
          <span className="monto">${ventas}</span> / <span className="objetivo">${objetivo_ventas} meta</span>
        </p>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${ventas / objetivo_ventas * 100}%` }}></div>
        </div>
        <p className="porcentaje">{(ventas / objetivo_ventas * 100).toFixed(2)}%</p>
      </div>
    </div>
  )
};
Card_ventas_productos.propTypes = {
  nombre: PropTypes.string.isRequired,     
  categoria: PropTypes.string.isRequired,     
  ventas: PropTypes.number,          
  objetivo_ventas: PropTypes.number,
};
//export default Card_ventas_sucursales
