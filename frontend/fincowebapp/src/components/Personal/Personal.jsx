import "./Personal.css"
import { Header } from "../Header/Header"
import { FaRegBuilding, FaUserTie } from "react-icons/fa";
function Personal() {
    return(
        <>
        <Header></Header>
        
        <div className="box-personal">

          
         <div className="box-personal-title">

            <h4><i><FaUserTie></FaUserTie></i>Personal</h4>
         </div>
         <div className="box-personal-description">
            <p>Gestiona a tu equipo de trabajo</p>
         </div>
         <div className="box-personal-filter">
            <input placeholder="Buscar..." type="text" />
         </div>

         <div className="box-personal-card">

         <div className="box-personal-card-child">

         <div className="box-personal-card-child-title">
                            <h4>
                              <i><FaUserTie></FaUserTie></i>
                                Nombre del Empleado
                            </h4>
                        </div>

                        <div className="box-personal-card-child-description">
                           <i><FaRegBuilding></FaRegBuilding></i> Sucursal asignada
                        </div>

                        <div className="box-personal-card-child-icons">
                        <span>Nombre de rol</span>
                        </div>

         </div>




         <div className="box-personal-card-child">

<div className="box-personal-card-child-title">
                   <h4>
                     <i><FaUserTie></FaUserTie></i>
                       Nombre del Empleado
                   </h4>
               </div>

               <div className="box-personal-card-child-description">
                  <i><FaRegBuilding></FaRegBuilding></i> Sucursal asignada
               </div>

               <div className="box-personal-card-child-icons">
               <span>Nombre de rol</span>
               </div>

</div>





<div className="box-personal-card-child">

<div className="box-personal-card-child-title">
                   <h4>
                     <i><FaUserTie></FaUserTie></i>
                       Nombre del Empleado
                   </h4>
               </div>

               <div className="box-personal-card-child-description">
                  <i><FaRegBuilding></FaRegBuilding></i> Sucursal asignada
               </div>

               <div className="box-personal-card-child-icons">
               <span>Nombre de rol</span>
               </div>

</div>


         </div>

        </div>
        
        </>
    )
}

export default Personal