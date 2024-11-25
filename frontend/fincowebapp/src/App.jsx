import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import { Home, Dashboard, Notfound, Login } from "./pages";

function App() {
  

  return (
    <>    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="login" element={<Login />}/>
       {/* <Route path="sales" element={<Sales />}/>
        <Route path="branches" element={<Branches />}/>
        <Route path="staff" element={<Staff />}/>*/}
        <Route path="*" element={<Notfound />}/>  
      </Routes>         
    </BrowserRouter>
    </>
  )
}

export default App
