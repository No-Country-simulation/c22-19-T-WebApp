
import "./ModalFilter.css";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";

const months = [
  {id: 1, name: 'Enero'},
  {id: 2, name: 'Febrero'},
  {id: 3, name: 'Marzo'},
  {id: 4, name: 'Abril'},
  {id: 5, name: 'Mayo'},
  {id: 6, name: 'Junio'},
  {id: 7, name: 'Julio'},
  {id: 8, name: 'Agosto'},
  {id: 9, name: 'Septiembre'},
  {id: 10, name: 'Octubre'},
  {id: 11, name: 'Noviembre'},
  {id: 12, name: 'Diciembre'},
]

export const ModalFilter = (props) => {  
  const { isOpen, onClose } = props;
  if (!isOpen) return null;
  const [timeMode, setTimeMode] = useState('by_period') //by_period or by_date
  const [timePeriod, setTimePeriod] = useState('mes') //semana, mes or anio

  useEffect(() => {
    console.log(timeMode, timePeriod);

  }, [timeMode, timePeriod])

  const handleClickTimeMode = (e) => {
    setTimeMode(e.target.id);
  };
  const handleClickTimePeriod = (e) => {
    setTimePeriod(e.target.id)
  }

  return (
    <div className="modal_period-overlay">
      <div className="modal_period-content">
        <header className="modal_period-header" >
            <h3 className="modal_period-header-title">Filtros</h3>
            <MdClose className="modal_period-header-close" onClick={onClose}/>            
        </header>
        <div className="modal_period-body">          
          <div className="modal_period-body-row">
            <input type="radio" name="time_mode" id="by_period" 
              checked={timeMode == 'by_period' ? true : false}
              onChange={handleClickTimeMode}/>
            <label htmlFor="by_period" className="modal_period-body-row__label">Por Período</label>
          </div>
          <div className="modal_period-body-row">
              <div className={`modal_period-body-row__btn ${timePeriod == 'semana' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='semana' onClick={handleClickTimePeriod}>Semana</div>
              <div className={`modal_period-body-row__btn ${timePeriod == 'mes' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='mes' onClick={handleClickTimePeriod}>Mes</div>
              <div className={`modal_period-body-row__btn ${timePeriod == 'anio' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='anio' onClick={handleClickTimePeriod}>Año</div>
          </div>
          <div className="modal_period-body-row">
            <select className="modal_period-body-row__select" name="current_periods" id="current_periods">
              {months.map((month) => (
                <option value={month.id} key={month.id}>{month.name}</option>
              ))}
            </select>
          </div>
          <div className="modal_period-body-row">
            <input type="radio" name="time_mode" id="by_date"  
            checked={timeMode == 'by_date' ? true : false} 
            onChange={handleClickTimeMode}/>
            <label htmlFor="by_date"  className="modal_period-body-row__label">Por Fecha</label>
          </div>
          <button className="modal_period-button">Aplicar</button>
        </div>
      </div>
    </div>
  );
};


