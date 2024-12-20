import "./ModalFilter.css";
import { MdClose, MdInfo } from "react-icons/md";
import { useState, useEffect } from "react";
import { getCompletedWeeksOfMonth } from "../../utils/dateHelpers";
import { useHome } from "../../context/HomeContext";

const weeks = getCompletedWeeksOfMonth();
const months = [
  { id: 1, name: "Enero", startDate: "2024-01-01", endDate: "2024-01-31" },
  { id: 2, name: "Febrero", startDate: "2024-02-01", endDate: "2024-02-29" },
  { id: 3, name: "Marzo", startDate: "2024-03-01", endDate: "2024-03-31" },
  { id: 4, name: "Abril", startDate: "2024-04-01", endDate: "2024-04-30" },
  { id: 5, name: "Mayo", startDate: "2024-05-01", endDate: "2024-05-31" },
  { id: 6, name: "Junio", startDate: "2024-06-01", endDate: "2024-06-30" },
  { id: 7, name: "Julio", startDate: "2024-07-01", endDate: "2024-07-31" },
  { id: 8, name: "Agosto", startDate: "2024-08-01", endDate: "2024-08-31" },
  { id: 9, name: "Septiembre", startDate: "2024-09-01", endDate: "2024-09-30" },
  { id: 10, name: "Octubre", startDate: "2024-10-01", endDate: "2024-10-31" },
  { id: 11, name: "Noviembre", startDate: "2024-11-01", endDate: "2024-11-30" },
  { id: 12, name: "Diciembre", startDate: "2024-12-01", endDate: "2024-12-31" },
];

const years = [
  { id: 1, name: "2021", startDate: "2021-01-01", endDate: "2021-12-31" },
  { id: 2, name: "2022", startDate: "2022-01-01", endDate: "2022-12-31" },
  { id: 3, name: "2023", startDate: "2023-01-01", endDate: "2023-12-31" },
  { id: 4, name: "2024", startDate: "2024-01-01", endDate: "2024-12-31" },
];

export const ModalFilter = (props) => {
  const { isOpen, onClose } = props;
  if (!isOpen) return null;

  const { filterDate, setFilterDate } = useHome();

  const [timeMode, setTimeMode] = useState(
    filterDate.periodName === "fechas" ? "by_date" : "by_period"
  );
  const [timePeriod, setTimePeriod] = useState(
    filterDate.periodName === "fechas" ? "mes" : filterDate.periodName
  );
  const [selectOptions, setSelectedOptions] = useState({
    semana: filterDate.idSemana,
    mes: filterDate.idMes,
    año: filterDate.idAño,
  });
  const [timePeriodsData, setTimePeriodsData] = useState(months);
  const [startDate, setStartDate] = useState(filterDate.start);
  const [endDate, setEndDate] = useState(filterDate.end);

  useEffect(() => {
    selectCurrentPeriodData(timePeriod);
  }, [timePeriod]);

  const selectCurrentPeriodData = (name) => {
    let newPeriodsData;
    switch (name) {
      case "semana":
        newPeriodsData = weeks;
        break;
      case "mes":
        newPeriodsData = months;
        break;
      case "año":
        newPeriodsData = years;
        break;
      default:
        newPeriodsData = months;
        break;
    }

    setTimePeriodsData(newPeriodsData);

    const selectedOption = newPeriodsData.find(
      (data) => data.id === selectOptions[name]
    );
    if (selectedOption) {
      setStartDate(selectedOption.startDate);
      setEndDate(selectedOption.endDate);
    }
  };

  const handleClickTimeMode = (e) => {
    setTimeMode(e.target.id);
  };

  const handleClickTimePeriod = (e) => {
    const newTimePeriod = e.target.id;
    setTimePeriod(newTimePeriod);
    selectCurrentPeriodData(newTimePeriod);
  };

  const handleSelectChange = (e) => {
    const newId = parseInt(e.target.value);

    setSelectedOptions((prevState) => ({
      ...prevState,
      [timePeriod]: newId,
    }));

    const selectedOption = timePeriodsData.find((data) => data.id === newId);
    if (selectedOption) {
      setStartDate(selectedOption.startDate);
      setEndDate(selectedOption.endDate);
    }
  };

  const handleSubmit = () => {
    setFilterDate({
      start: startDate,
      end: endDate,
      periodName: timeMode === "by_period" ? timePeriod : "fechas",
      idSemana: selectOptions["semana"],
      idMes: selectOptions["mes"],
      idAño: selectOptions["año"],
    });
    onClose();
  };

  return (
    <div className="modal_period-overlay">
      <div className="modal_period-content">
        <header className="modal_period-header">
          <h3 className="modal_period-header-title">Filtros</h3>
          <MdClose className="modal_period-header-close" onClick={onClose} />
        </header>
        <div className="modal_period-body">
          <div className="modal_period-body-row">
            <input
              type="radio"
              name="time_mode"
              id="by_period"
              checked={timeMode === "by_period"}
              onChange={handleClickTimeMode}
            />
            <label htmlFor="by_period" className="modal_period-body-row__label">
              Por Período
            </label>
          </div>

          {timeMode === "by_period" && (
            <>
              <div className="modal_period-body-row">
                <div
                  className={`modal_period-body-row__btn ${
                    timePeriod === "semana"
                      ? "modal_period-body-row__btn-selected"
                      : ""
                  }`}
                  id="semana"
                  onClick={handleClickTimePeriod}
                >
                  semana
                </div>
                <div
                  className={`modal_period-body-row__btn ${
                    timePeriod === "mes"
                      ? "modal_period-body-row__btn-selected"
                      : ""
                  }`}
                  id="mes"
                  onClick={handleClickTimePeriod}
                >
                  mes
                </div>
                <div
                  className={`modal_period-body-row__btn ${
                    timePeriod === "año"
                      ? "modal_period-body-row__btn-selected"
                      : ""
                  }`}
                  id="año"
                  onClick={handleClickTimePeriod}
                >
                  año
                </div>
              </div>
              <div className="modal_period-body-row">
                <div className="modal_period-body-column">
                  <label
                    htmlFor="current_periods"
                    className={`modal_period-body-row__label ${
                      timePeriod !== "semana"
                        ? "modal_period-body-row__label-hide"
                        : ""
                    }`}
                  >
                    Elige la semana
                    <MdInfo className="modal_period-body-row__icon" />
                  </label>
                  <select
                    className="modal_period-body-row__select"
                    name="current_periods"
                    id="current_periods"
                    onChange={handleSelectChange}
                    value={selectOptions[timePeriod]}
                  >
                    {timePeriodsData.map((data) => (
                      <option
                        className="modal_period-body-row__option"
                        value={data.id}
                        key={data.id}
                      >
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="modal_period-body-row">
            <input
              type="radio"
              name="time_mode"
              id="by_date"
              checked={timeMode === "by_date"}
              onChange={handleClickTimeMode}
            />
            <label htmlFor="by_date" className="modal_period-body-row__label">
              Por Fecha
            </label>
          </div>

          {timeMode === "by_date" && (
            <>
              <div className="modal_period-body-row">
              <div className="modal_period-body-column">
                <label htmlFor="start_date" className="modal_period-body-row__label">Fecha de inicio</label>
                <input type="date" className="modal_period-body-row__select" name="start_date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
              </div>
            </div>
            <div className="modal_period-body-row">
              <div className="modal_period-body-column">
                <label htmlFor="end_date" className="modal_period-body-row__label">Fecha de fin</label>
                <input type="date" className="modal_period-body-row__select" name="end_date" id="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
              </div>
            </div>
            </>
          )}
          <button className="modal_period-button" onClick={handleSubmit}>Aplicar</button>
        </div>
      </div>
    </div>
  );
};
