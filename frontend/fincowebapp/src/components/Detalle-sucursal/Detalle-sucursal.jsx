import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Detalle-sucursal.css"
import axios from "axios";
import { Header } from "../Header/Header";
import { FaRegBuilding, FaUserTie, FaTag } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faHourglassStart } from '@fortawesome/free-solid-svg-icons';
function DetalleSucursal() {
    const { id } = useParams(); // Obtener el ID de la URL
    const [detalle, setDetalle] = useState(null);

    useEffect(() => {
        const getBranchDetails = async () => {
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
                setDetalle(response.data);


            } catch (error) {
                console.error("Error fetching branch details:", error);
            }
        };

        getBranchDetails();
    }, [id]);

    if (!detalle) {
        return <div className="Loading"><i><FontAwesomeIcon icon={faHourglassStart} shake /></i></div>;
    }

    return (
        <>
            <Header>

            </Header>
            <div className="Detalle-box-sucursal">
                <div className="Detalle-box-sucursal-title">
                   <h4> <Link to="/branches"><FontAwesomeIcon icon={faArrowLeft} /></Link><i><FaRegBuilding></FaRegBuilding></i>{detalle.nombre} </h4>
                    
                </div>
                <div className="Detalle-box-sucursal-description">
                    <p>
                        Gestiona tus sucursales
                    </p>

                </div>
           
                <div className="Detalle-box-sucursal-card">
                    <div className="Detalle-box-sucursal-card-title">
                        <h4>Informacion</h4>
                    </div>
                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Nombre de sucursal</h4>

                            <p>
                                {detalle.nombre}
                            </p>

                        </div>

                    </div>

                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Ciudad</h4>

                            <p>
                                {detalle.ciudad.nombre}
                            </p>

                        </div>

                    </div>

                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Provincia</h4>

                            <p>
                                {detalle.provincia.nombre}
                            </p>

                        </div>

                    </div>

                 

                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Empleados</h4>

                            <div>

                            </div>
                            <p>
                                <div>
                                    <p>Empleados totales: {detalle.empleados.length}</p>
                                    {Array.isArray(detalle.empleados) ? (
                                        detalle.empleados.map((e) => (
                                            <p key={e.id}>{e.nombre}</p>
                                        ))
                                    ) : (
                                        <p>Cargando empleados...</p>
                                    )}
                                </div>

                            </p>

                        </div>

                    </div>

                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Gerente</h4>

                            <div>

                            </div>
                            <p>
                                <div className="Detalle-box-sucursal-card-child-Info-Gerente">
                                  
                                        {detalle.empleados.map((e) => (
                                            <p key={e.id}>{e.rol==="gerencia"?e.nombre:""}</p>
                                        ))}
                                   
                                 
                                </div>

                            </p>

                        </div>

                    </div>
                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Ventas totales</h4>

                            <p>
                                ${detalle.ventas_totales}
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default DetalleSucursal;
