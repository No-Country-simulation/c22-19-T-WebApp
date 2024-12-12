import { Header } from "../Header/Header"
import "./Sucursales.css"
import { useState } from "react";
import { FaRegBuilding, FaUserTie, FaTag } from "react-icons/fa";
function Sucursales() {
   
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
                    <input placeholder="Buscar..." type="text" />
                </div>

             


                <div className="box-sucursal-card">


                    <div className="box-sucursal-card-child">


                        <div className="box-sucursal-card-child-title">
                            <h4>
                              <i><FaRegBuilding></FaRegBuilding></i>
                                Constitucion
                            </h4>
                        </div>

                        <div className="box-sucursal-card-child-description">
                            Colima
                        </div>

                        <div className="box-sucursal-card-child-icons">
                            <span><FaUserTie></FaUserTie>450</span>

                            <span><FaTag ></FaTag > 485</span>
                        </div>

                    </div>      

                    
                    <div className="box-sucursal-card-child">


                        <div className="box-sucursal-card-child-title">
                            <h4>
                              <i><FaRegBuilding></FaRegBuilding></i>
                                Constitucion
                            </h4>
                        </div>

                        <div className="box-sucursal-card-child-description">
                            Colima
                        </div>

                        <div className="box-sucursal-card-child-icons">
                            <span><FaUserTie></FaUserTie>450</span>

                            <span><FaTag ></FaTag > 485</span>
                        </div>

                    </div>      

                    
                    <div className="box-sucursal-card-child">


                        <div className="box-sucursal-card-child-title">
                            <h4>
                              <i><FaRegBuilding></FaRegBuilding></i>
                                Constitucion
                            </h4>
                        </div>

                        <div className="box-sucursal-card-child-description">
                            Colima
                        </div>

                        <div className="box-sucursal-card-child-icons">
                            <span><FaUserTie></FaUserTie>45</span>

                            <span><FaTag ></FaTag > 485</span>
                        </div>

                    </div>      

                    
                    <div className="box-sucursal-card-child">


                        <div className="box-sucursal-card-child-title">
                            <h4>
                              <i><FaRegBuilding></FaRegBuilding></i>
                                Constitucion
                            </h4>
                        </div>

                        <div className="box-sucursal-card-child-description">
                            Colima
                        </div>

                        <div className="box-sucursal-card-child-icons">
                            <span><FaUserTie></FaUserTie>450</span>

                            <span><FaTag ></FaTag > 485</span>
                        </div>

                    </div>      

                 

                </div>


            </div>

        </>
    )
}

export default Sucursales 