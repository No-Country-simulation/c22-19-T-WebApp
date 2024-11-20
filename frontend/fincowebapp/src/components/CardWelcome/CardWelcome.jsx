import { FaChartLine, FaArrowUp, FaArrowDown   } from "react-icons/fa";
import './CardWelcome.css';
export const CardWelcome = (props) => {
    const { name = "Usuario", salesValue = 0, salesValuePrev = 0 } = props;

    const difference = salesValue - salesValuePrev;
    const percentage = (salesValuePrev !== 0) 
    ? (difference * 100) / salesValuePrev 
    : 0; 

    const formattedPercentage = percentage.toFixed(2); 
    
    return (
      <section className="cardwelcome">
        <header className="cardwelcome__header">
          <h2>👋🏼 Hola{` ${name}!`}</h2>
        </header>
        <div className="cardwelcome__content">
            <div className="cardwelcome__content__values">
                <p id="sales_value" aria-label="Ventas actuales">{`$${salesValue}`}</p>
                <p aria-label="Ventas del período anterior">{`$${salesValuePrev} período anterior`}</p>
            </div>        
            <div className="cardwelcome__content__porcentage">
                <FaChartLine className="cardwelcome__content__porcentage__icon"/>
                <p
                    className={difference > 0 ? "increase_value" : "decrease_value"}
                    aria-label={`Cambio porcentual de ventas: ${formattedPercentage}%`}
                >
                    {difference > 0 ? <FaArrowUp /> : <FaArrowDown />}
                    {`${formattedPercentage}%`}
                </p>
            </div>
        </div>
      </section>
    );
}