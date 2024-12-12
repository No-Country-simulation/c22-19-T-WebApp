import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegBuilding, FaUserTie } from "react-icons/fa";
import "./Personal.css";
import { Header } from "../Header/Header";
import { Navigate, useNavigate } from "react-router-dom";
function Personal() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate= useNavigate()
    const getBranchesData = async () => {
        try {
            const response = await axios.get(
                `https://c2219twebapp.pythonanywhere.com/negocio/api/v1/usuarios/`,
                {
                    headers: {
                        "X-CSRFToken": "9pCrhFRWZNUyUXzD8hPym5KeqwuhRS5KdkKlhiTyDDdVGagK7C04maYn4wCCbQFN",
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching branches data:", error);
        }
    };

    useEffect(() => {
        getBranchesData();
    }, []);

    const filteredData = data.filter((empleado) =>
        empleado.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Filtrar empleados según el término de búsqueda

    return (
        <>
            <Header />
            <div className="box-personal">
                <div className="box-personal-title">
                    <h4>
                        <i>
                            <FaUserTie />
                        </i>
                        Personal
                    </h4>
                </div>
                <div className="box-personal-description">
                    <p>Gestiona a tu equipo de trabajo</p>
                </div>
                <div className="box-personal-filter">
                    <input
                        placeholder="Buscar..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="box-personal-card">
                    {filteredData.map((empleado) => (
                        <div key={empleado.id} className="box-personal-card-child"
                        onClick={() => navigate(`/DetallesPersonal/${empleado.id}`)}>
                            <div className="box-personal-card-child-title">
                                <h4>
                                    <i>
                                        <FaUserTie />
                                    </i>
                                    {empleado.username}
                                </h4>
                            </div>
                            <div className="box-personal-card-child-description">
                                <i>
                                    <FaRegBuilding />
                                </i>
                                {empleado.sucursal.nombre}
                            </div>
                            <div
                                className={
                                    empleado.rol === "ventas"
                                        ? "box-personal-card-child-icons"
                                        : "box-personal-card-child-icons-red"
                                }
                            >
                                <span>{empleado.rol || "Sin rol asignado"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Personal;
