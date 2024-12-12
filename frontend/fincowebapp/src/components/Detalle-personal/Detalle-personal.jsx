import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Header/Header";
import { FaRegBuilding, FaUserTie } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Detalle-personal.css";

function DetallePersonal() {
    const { id, empleadoId } = useParams(); // ID de la sucursal y empleado
    const [empleado, setEmpleado] = useState(null);

    useEffect(() => {
        const getEmpleadoDetails = async () => {
            try {
                const response = await axios.get(
                    `https://c2219twebapp.pythonanywhere.com/negocio/api/v1/sucursales/${id}`,
                    {
                        headers: {
                            "X-CSRFToken": "9pCrhFRWZNUyUXzD8hPym5KeqwuhRS5KdkKlhiTyDDdVGagK7C04maYn4wCCbQFN",
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

                const empleadoData = response.data.empleados.find(
                    (e) => e.id.toString() === empleadoId
                );

                setEmpleado(empleadoData);
            } catch (error) {
                console.error("Error fetching empleado details:", error);
            }
        };

        getEmpleadoDetails();
    }, [id, empleadoId]);

    if (!empleado) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <Header />
            <div className="Detalle-box-sucursal">
                <div className="Detalle-box-sucursal-title">
                    <h4>
                        <Link to="/branches">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                        <i>
                            <FaRegBuilding />
                        </i>
                        {empleado.nombre}
                    </h4>
                </div>
                <div className="Detalle-box-sucursal-description">
                    <p>Detalles del empleado</p>
                </div>
                <div className="Detalle-box-sucursal-card">
                    <div className="Detalle-box-sucursal-card-child">
                        <h4>Nombre:</h4>
                        <p>{empleado.nombre}</p>
                    </div>
                    <div className="Detalle-box-sucursal-card-child">
                        <h4>Rol:</h4>
                        <p>{empleado.rol || "Sin rol asignado"}</p>
                    </div>
                    <div className="Detalle-box-sucursal-card-child">
                        <h4>Ventas totales:</h4>
                        <p>{empleado.ventas_totales || "No disponibles"}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetallePersonal;
