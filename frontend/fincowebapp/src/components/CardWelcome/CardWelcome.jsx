import { useState } from "react";
import { FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdMoreVert, MdOutlineFilterAlt, MdWidthFull } from "react-icons/md";
import "./CardWelcome.css";
import { ModalFilter } from "./ModalFilter";
import { useHome } from "../../context/HomeContext";

export const CardWelcome = (props) => {
  const { name = "Usuario", sales } = props; 
  const { filterDate, setFilterDate } = useHome();

const difference = 10;
const formattedPercentage = 10.2;
  const [isModalOpen, setModalOpen] = useState(false);


  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  

    //console.log(currentSalesData);

  return (
    <section className="cardwelcome">
      <header className="cardwelcome__header">
        <h2 className="cardwelcome__header__title">👋🏼 Hola{` ${name}!`}</h2>
        <div className="cardwelcome__header__badge-filter-container">
          <div className="badge-filter cardwelcome__header-btn-menu" onClick={openModal}>
            <MdOutlineFilterAlt className="badge-filter-icon" />
            <span>{filterDate.periodName}</span>
          </div>          
          <ModalFilter isOpen={isModalOpen} onClose={closeModal} />          
        </div>
      </header>
      <div className="cardwelcome__content">
        <div className="cardwelcome__content__values">
          <p id="sales_value" aria-label="Ventas actuales"></p>
          <p id="sales_value_prev" aria-label="Ventas del período anterior">{` período ${filterDate.periodName} anterior`}</p>
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
