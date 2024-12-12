import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import { Home, Notfound, UnderConstruction, Login } from "./pages";

import { AuthProvider } from "./context/AuthContext";
import { HomeProvider } from "./context/HomeContext";
import Sucursales from "./components/Sucursales/Sucursales";
import Personal from "./components/Personal/Personal";
import DetalleSucursal from "./components/Detalle-sucursal/Detalle-sucursal";
import DetallePersonal from "./components/Detalle-personal/Detalle-personal";
function App() {   

  return (
    <>        
     <AuthProvider>
        <HomeProvider>
          <Router  basename='/'>
            <Routes  >
              <Route path="/" element={<Home />}/>
              <Route path="dashboard" element={<UnderConstruction />}/>
              <Route path="sales" element={<UnderConstruction />}/>
              <Route path="branches" element={<Sucursales/>}/>
              <Route path="DetallesSucursales/:id" element={<DetalleSucursal></DetalleSucursal>}/>
              <Route path="DetallesPersonal/:id" element={<DetallePersonal></DetallePersonal>}/>
              <Route path="staff" element={<Personal />}/>
              <Route path="*" element={<Notfound />}/>  
              <Route path="login" element={<Login />}/>  
            </Routes>    
          </Router>   
        </HomeProvider> 
      </AuthProvider>     
    </>
  )
}

export default App
