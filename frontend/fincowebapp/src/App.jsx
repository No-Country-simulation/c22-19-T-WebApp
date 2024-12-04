import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import { Home, Notfound, UnderConstruction, Login } from "./pages";

import { AuthProvider } from "./context/AuthContext";

function App() {   

  return (
    <>        
     <AuthProvider>
      <Router  basename='/'>
        <Routes  >
          <Route path="/" element={<Home />}/>
          <Route path="dashboard" element={<UnderConstruction />}/>
          <Route path="sales" element={<UnderConstruction />}/>
          <Route path="branches" element={<UnderConstruction />}/>
          <Route path="staff" element={<UnderConstruction />}/>
          <Route path="*" element={<Notfound />}/>  
          <Route path="login" element={<Login />}/>  
        </Routes>    
      </Router>    
      </AuthProvider>     
    </>
  )
}

export default App
