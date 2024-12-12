
import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Header/Header";
import { FaRegBuilding, FaUserTie, FaTag } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./Detalle-personal.css"

function DetallePersonal() {
    
    const { id } = useParams(); // Obtener el ID de la URL
    const { nombre } = useParams(); // Obtener el ID de la URL
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
        return <p>Cargando...</p>;
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
                        Gestiona tu personal
                    </p>

                </div>
           
                <div className="Detalle-box-sucursal-card">
                    <div className="Detalle-box-sucursal-card-title">
                        <h4>Informacion</h4>
                    </div>
                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Nombre de empleado</h4>

                            <p>
                                {detalle.nombre}
                            </p>

                        </div>

                    </div>

                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Ciudad</h4>

                            <p>
                                
                            </p>

                        </div>

                    </div>

                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Provincia</h4>

                            <p>
                           
                            </p>

                        </div>

                    </div>

                 


                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Rol</h4>

                            <div>

                            </div>
                            <p>
                                <div>
                                  
                                </div>

                            </p>

                        </div>

                    </div>
                    <div className="Detalle-box-sucursal-card-child">
                        <div className="Detalle-box-sucursal-card-child-Info">
                            <h4>Ventas totales</h4>

                            <p>
                                {detalle.ventas_totales}
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default DetallePersonal