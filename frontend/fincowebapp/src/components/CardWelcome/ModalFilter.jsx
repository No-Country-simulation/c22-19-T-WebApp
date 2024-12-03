
import "./ModalFilter.css";
import { MdClose, MdInfo  } from "react-icons/md";
import { useState, useEffect } from "react";
import {getCompletedWeeksOfMonth} from '../../utils/dateHelpers';

const weeks = getCompletedWeeksOfMonth();
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
];
const years = [  
  {id: 1, name: '2021'},
  {id: 2, name: '2022'},
  {id: 3, name: '2023'},
  {id: 4, name: '2024'},
];



export const ModalFilter = (props) => {  
  const { isOpen, onClose } = props;
  if (!isOpen) return null;
  const [timeMode, setTimeMode] = useState('by_period') //by_period or by_date
  const [timePeriod, setTimePeriod] = useState('mes') //semana, mes or anio
  const [timePeriodsData, setTimePeriodsData] = useState(months);

  useEffect(() => {
    console.log(timeMode, timePeriod);

  }, [timeMode, timePeriod])

  const handleClickTimeMode = (e) => {
    setTimeMode(e.target.id);
  };
  const handleClickTimePeriod = (e) => {
    setTimePeriod(e.target.id);
    switch (e.target.id) {
      case 'semana':
          setTimePeriodsData(weeks);
        break;
        case 'mes':
          setTimePeriodsData(months);
        break;
        case 'anio':
          setTimePeriodsData(years);
        break;
      default:
          setTimePeriodsData(months);
        break;
    }
  }

  return (
    <div className="modal_period-overlay">
      <div className="modal_period-content">
        <header className="modal_period-header" >
            <h3 className="modal_period-header-title">Filtros</h3>
            <MdClose className="modal_period-header-close" onClick={onClose}/>            
        </header>
        <div className="modal_period-body">          


          {/* POR PERIODOS */}
          <div className="modal_period-body-row">
            <input type="radio" name="time_mode" id="by_period" 
              checked={timeMode == 'by_period' ? true : false}
              onChange={handleClickTimeMode}/>
            <label htmlFor="by_period" className="modal_period-body-row__label">Por Período</label>
          </div>

          {(timeMode == 'by_period') ?
          (<>
          <div className="modal_period-body-row">
              <div className={`modal_period-body-row__btn ${timePeriod == 'semana' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='semana' onClick={handleClickTimePeriod}>Semana</div>
              <div className={`modal_period-body-row__btn ${timePeriod == 'mes' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='mes' onClick={handleClickTimePeriod}>Mes</div>
              <div className={`modal_period-body-row__btn ${timePeriod == 'anio' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='anio' onClick={handleClickTimePeriod}>Año</div>
          </div>          
          <div className="modal_period-body-row">
            <div className="modal_period-body-column">
              <label htmlFor="current_periods" className={`modal_period-body-row__label ${timePeriod != 'semana' ? 'modal_period-body-row__label-hide' : ''}`}>
                Elige la semana
                <MdInfo className="modal_period-body-row__icon"/>
              </label>
              <select className="modal_period-body-row__select" name="current_periods" id="current_periods">
                {timePeriodsData.map((data) => (
                  <option className="modal_period-body-row__option"
                  value={data.id} key={data.id}>{data.name}</option>  
                ))}
              </select>
            </div>
          </div>
          </>) :
          ('')
          }

          {/* POR FECHAS */}
          <div className="modal_period-body-row">
            <input type="radio" name="time_mode" id="by_date"  
            checked={timeMode == 'by_date' ? true : false} 
            onChange={handleClickTimeMode}/>
            <label htmlFor="by_date"  className="modal_period-body-row__label">Por Fecha</label>
          </div>

          {(timeMode == 'by_date') ?
          <>
            <div className="modal_period-body-row">
              <div className="modal_period-body-column">
                <label htmlFor="start_date" className="modal_period-body-row__label">Fecha de inicio</label>
                <input type="date" className="modal_period-body-row__select" name="start_date" id="start_date" />
              </div>
            </div>
            <div className="modal_period-body-row">
              <div className="modal_period-body-column">
                <label htmlFor="end_date" className="modal_period-body-row__label">Fecha de fin</label>
                <input type="date" className="modal_period-body-row__select" name="end_date" id="end_date" />
              </div>
            </div>
          </>
          :
            ('')
          }

          <button className="modal_period-button">Aplicar</button>
        </div>
      </div>
    </div>
  );
};


