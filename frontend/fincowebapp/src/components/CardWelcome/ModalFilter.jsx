
import "./ModalFilter.css";
import { MdClose, MdInfo  } from "react-icons/md";
import { useState, useEffect } from "react";
import {getCompletedWeeksOfMonth} from '../../utils/dateHelpers';
import { useHome } from "../../context/HomeContext";

const weeks = getCompletedWeeksOfMonth();
const months = [
  { id: 1, name: 'Enero', startDate: "01/01/2024", endDate: "31/01/2024" },
  { id: 2, name: 'Febrero', startDate: "01/02/2024", endDate: "29/02/2024" }, // Año bisiesto
  { id: 3, name: 'Marzo', startDate: "01/03/2024", endDate: "31/03/2024" },
  { id: 4, name: 'Abril', startDate: "01/04/2024", endDate: "30/04/2024" },
  { id: 5, name: 'Mayo', startDate: "01/05/2024", endDate: "31/05/2024" },
  { id: 6, name: 'Junio', startDate: "01/06/2024", endDate: "30/06/2024" },
  { id: 7, name: 'Julio', startDate: "01/07/2024", endDate: "31/07/2024" },
  { id: 8, name: 'Agosto', startDate: "01/08/2024", endDate: "31/08/2024" },
  { id: 9, name: 'Septiembre', startDate: "01/09/2024", endDate: "30/09/2024" },
  { id: 10, name: 'Octubre', startDate: "01/10/2024", endDate: "31/10/2024" },
  { id: 11, name: 'Noviembre', startDate: "01/11/2024", endDate: "30/11/2024" },
  { id: 12, name: 'Diciembre', startDate: "01/12/2024", endDate: "31/12/2024" },
];
const years = [  
  { id: 1, name: '2021', startDate: "01/01/2021", endDate: "31/12/2021" },
  { id: 2, name: '2022', startDate: "01/01/2022", endDate: "31/12/2022" },
  { id: 3, name: '2023', startDate: "01/01/2023", endDate: "31/12/2023" },
  { id: 4, name: '2024', startDate: "01/01/2024", endDate: "31/12/2024" },
];



export const ModalFilter = (props) => {  
  const { isOpen, onClose } = props;
  if (!isOpen) return null;
  const [timeMode, setTimeMode] = useState('by_period') //by_period or by_date
  //const [timePeriod, setTimePeriod] = useState('mes') //semana, mes or anio
  const [timePeriodsData, setTimePeriodsData] = useState([]);
  const {filterDate, setFilterDate} = useHome();

  useEffect(() => {
    console.log('current settings: ',timeMode, filterDate.periodName);
    console.log(filterDate.periodName)
    selectCurrentPeriodData(filterDate.periodName);

  }, [timeMode, filterDate.periodName])

  const selectCurrentPeriodData = (name) => {
    switch (name) {
      case 'semana':
          setTimePeriodsData(weeks);
        break;
        case 'mes':
          setTimePeriodsData(months);
        break;
        case 'año':
          setTimePeriodsData(years);
        break;
      default:
          setTimePeriodsData(months);
        break;
    }
  }

  const handleClickTimeMode = (e) => {
    setTimeMode(e.target.id);    
    setFilterDate((prevState) => ({
      ...prevState, // Mantener todos los demás atributos
      periodName: (prevState.periodName == 'fechas' ? 'mes' : 'fechas'), 
    }));
  };
  const handleClickTimePeriod = (e) => {
    //setTimePeriod(e.target.id);
    setFilterDate((prevState) => ({
      ...prevState, // Mantener todos los demás atributos
      periodName: e.target.id, // Cambiar solo periodName
    }));
    //console.log(e.target.id)
    selectCurrentPeriodData(e.target.id);
  }

  const handleSelectChange = (e) => {
    //aca tengo que setear los valores de filterDate
    console.log(`${filterDate.periodName} : ${e.target.value}`, timePeriodsData);//p.e. : mes, 10
    setFilterDate((prevState) => ({
      ...prevState, // Mantener todos los demás atributos
      id: e.target.value,
      start: timePeriodsData.find(period => period.id == e.target.value).startDate, 
      end: timePeriodsData.find(period => period.id == e.target.value).endDate 
    }));
  }

  const handleSubmit = (e) => {
    console.log(filterDate)
    onClose();
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

          {(timeMode == 'by_period' ) ?
          (<>
          <div className="modal_period-body-row">
              <div className={`modal_period-body-row__btn ${filterDate.periodName == 'semana' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='semana' onClick={handleClickTimePeriod}>semana</div>
              <div className={`modal_period-body-row__btn ${filterDate.periodName == 'mes' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='mes' onClick={handleClickTimePeriod}>mes</div>
              <div className={`modal_period-body-row__btn ${filterDate.periodName == 'año' ? 'modal_period-body-row__btn-selected' : ''} `}
                id='año' onClick={handleClickTimePeriod}>año</div>
          </div>          
          <div className="modal_period-body-row">
            <div className="modal_period-body-column">
              <label htmlFor="current_periods" className={`modal_period-body-row__label ${filterDate.periodName != 'semana' ? 'modal_period-body-row__label-hide' : ''}`}>
                Elige la semana
                <MdInfo className="modal_period-body-row__icon"/>
              </label>
              <select className="modal_period-body-row__select" name="current_periods" id="current_periods" 
                onChange={handleSelectChange} >
                {timePeriodsData.map((data) => (
                  <option className="modal_period-body-row__option"
                    value={data.id} key={data.id}>
                      {data.name}
                  </option>  
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

          <button className="modal_period-button" onClick={handleSubmit}>Aplicar</button>
        </div>
      </div>
    </div>
  );
};


