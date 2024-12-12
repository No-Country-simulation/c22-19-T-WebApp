import { Header } from "../Header/Header"
import "./Sucursales.css"
import { useEffect, useState } from "react";
import { FaRegBuilding, FaUserTie, FaTag } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Sucursales() {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [filtro, setFiltro]=useState("")

    
    const getBranchesData = async () => {
        try {
            const response = await axios.get(
                `https://c2219twebapp.pythonanywhere.com/negocio/api/v1/sucursales/`,
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

        getBranchesData()
    
    }, [])

    const filteredData = data.filter(d => d.nombre.toLowerCase().includes(filtro.toLowerCase()));

    return (
        <>

            <Header>

            </Header>
            <div className="box-sucursal">

                <div className="box-sucursal-title">
                    <h4><i><FaRegBuilding></FaRegBuilding></i>Sucursales</h4>

                </div>
                <div className="box-sucursal-description">
                    <p>
                        Gestiona tus sucursales
                    </p>
                </div>
                <div className="box-sucursal-filter">
                    <input  onChange={(e) => setFiltro(e.target.value)} placeholder="Buscar..." type="text" />
                </div>




                <div className="box-sucursal-card">

                    {filteredData.map((d) => {
                        
                        const numeroAleatorio =  Math.floor(Math.random() * 100);;
                        
                          return(
                        
                        <div className="box-sucursal-card-child"
                        onClick={() => navigate(`/DetallesSucursales/${d.id}`)}>


                            <div className="box-sucursal-card-child-title">
                                <h4>
                                    <i><FaRegBuilding></FaRegBuilding></i>
                                    {d.nombre}
                                </h4>
                            </div>

                            <div className="box-sucursal-card-child-description">
                                <p>{d.ciudad.nombre}</p>
                            </div>

                            <div className="box-sucursal-card-child-icons">
                                <span><FaUserTie></FaUserTie>{d.empleados.length}</span>

                                <span><FaTag ></FaTag > 100</span>
                            </div>

                        </div>
                           )
                       

                    })}



               



                </div>


            </div>

        </>
    )
}

export default Sucursales 