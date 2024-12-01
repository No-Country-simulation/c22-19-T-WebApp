import { useState } from "react";
import { FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdMoreVert, MdOutlineFilterAlt, MdWidthFull } from "react-icons/md";
import "./CardWelcome.css";
import { ModalFilter } from "./ModalFilter";


export const CardWelcome = (props) => {
  const { name = "Usuario", sales, period = "mensual", onChangePeriod } = props; 
  
  const [currentSalesData, setCurrentSalesData] = useState(sales.find(sale => sale.period == period));

  const difference = currentSalesData.salesValue - currentSalesData.salesValuePrev;
  const percentage = currentSalesData.salesValuePrev !== 0 ? (difference * 100) / currentSalesData.salesValuePrev : 0;
  const formattedPercentage = percentage.toFixed(2);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  

  const handlePeriodChange = (newPeriod) => {
    onChangePeriod(newPeriod);
    setCurrentSalesData(sales.find(sale => sale.period == newPeriod));        
  };  

  //console.log(currentSalesData);

  return (
    <section className="cardwelcome">
      <header className="cardwelcome__header">
        <h2 className="cardwelcome__header__title">👋🏼 Hola{` ${name}!`}</h2>
        <div className="cardwelcome__header__badge-filter-container">
          <div className="badge-filter">
            <MdOutlineFilterAlt className="badge-filter-icon" />
            <span>{period}</span>
          </div>
          <div className="cardwelcome__header-btn-menu" onClick={openModal}>
            <MdMoreVert className="menu-open-icon"  />
          </div>
          <ModalFilter isOpen={isModalOpen} onClose={closeModal} />
          
        </div>
      </header>
      <div className="cardwelcome__content">
        <div className="cardwelcome__content__values">
          <p id="sales_value" aria-label="Ventas actuales">{`$${currentSalesData.salesValue}`}</p>
          <p id="sales_value_prev" aria-label="Ventas del período anterior">{`$${currentSalesData.salesValuePrev} período ${currentSalesData.period} anterior`}</p>
        </div>
        <div className="cardwelcome__content__porcentage">
          <FaChartLine className="cardwelcome__content__porcentage__icon" />
          <p
            className={
              difference > 0 ? "badge-porcentage increase_value" : "badge-porcentage decrease_value"
            }
            aria-label={`Cambio porcentual de ventas: ${formattedPercentage}%`}
          >
            {difference > 0 ? <FaArrowUp /> : <FaArrowDown />}
            <span>{`${formattedPercentage}%`}</span>
          </p>
        </div>
      </div>
      
    </section>
  );
};
