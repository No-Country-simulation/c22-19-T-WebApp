import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Header/Header";
import { FaRegBuilding, FaUserTie } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import "./Detalle-personal.css";

function DetallePersonal() {
    const { empleadoId } = useParams(); // ID del empleado desde el parámetro de la URL
    const [empleado, setEmpleado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getEmpleadoDetails = async () => {
            try {
                const response = await axios.get(
                    `https://c2219twebapp.pythonanywhere.com/negocio/api/v1/usuarios/${empleadoId}`,
                    {
                        headers: {
                            "X-CSRFToken": "9pCrhFRWZNUyUXzD8hPym5KeqwuhRS5KdkKlhiTyDDdVGagK7C04maYn4wCCbQFN",
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                setEmpleado(response.data);
            } catch (error) {
                setError("Error al cargar la información del empleado.");
                console.error("Error fetching empleado details:", error.message);
            } finally {
                setLoading(false);
            }
        };

        getEmpleadoDetails();
    }, [empleadoId]);

    if (loading) {
        return <div className="Loading"><i><FontAwesomeIcon icon={faHourglassStart} shake /></i></div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!empleado) {
        return <p>No se encontró información del empleado.</p>;
    }

    return (
        <>
            <Header />
            <div className="Detalle-box-personal">
                <div className="Detalle-box-personal-title">
                    <h4>
                        <Link to="/staff">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                        <i>
                            <FaUserTie />
                        </i>
                        {empleado.username}
                    </h4>
                </div>
                
                <div className="Detalle-box-personal-description">
                    <p>Detalles del empleado</p>
                </div>
                <div className="Detalle-box-personal-card">
                <div className="Detalle-box-personal-card-title">
                      
                        <h4>Informacion</h4>
         
                    </div>
                    <div className="Detalle-box-personal-card-child">
                         <div className="Detalle-box-personal-card-child-Info ">
                        <h4>Usuario</h4>
                        <p>{empleado.username}</p>
                         </div>
                    </div>
                    <div className="Detalle-box-personal-card-child">
                        <div className="Detalle-box-personal-card-child-Info ">
                        <h4>Nombre</h4>
                        <p>{empleado.first_name}</p>
                         </div>
                    </div>
                    <div className="Detalle-box-personal-card-child">
                          <div className="Detalle-box-personal-card-child-Info ">
                        <h4>Apellido</h4>
                        <p>{empleado.last_name}</p>
 </div>
                    </div>
                    <div className="Detalle-box-personal-card-child">
  <div className="Detalle-box-personal-card-child-Info personal">
                        <h4>Rol</h4>
                        <p>{empleado.rol || "Sin rol asignado"}</p>
                         </div>
                    </div>
                    <div className="Detalle-box-personal-card-child">
  <div className="Detalle-box-personal-card-child-Info personal">
                        <h4>Sucursal asignada</h4>
                        <p>{empleado.sucursal.nombre || "No disponibles"}</p>
                         </div>
                    </div>
                </div>


                {empleado.rol==="ventas"&&(
                     <div className="Detalle-box-sucursal-card-2">
                <div className="Detalle-box-sucursal-card-title">
                        <h4>Ventas</h4>
                    </div>
                    <div className="Detalle-box-sucursal-card-child-2">
                        <h4>Semanal</h4>
                        <p>${empleado.venta_semanal}</p>
                    </div>
                    <div className="Detalle-box-sucursal-card-child-2">
                        <h4>Mensual</h4>
                        <p>${empleado.venta_mensual}</p>
                    </div>
                    <div className="Detalle-box-sucursal-card-child-2">
                        <h4>Anual</h4>
                        <p>${empleado.venta_anual}</p>
                    </div>
                </div>
                )}
               
            </div>
        </>
    );
}

export default DetallePersonal;
