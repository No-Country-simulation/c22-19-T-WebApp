import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./Login.css";
import logoLogin from "../../assets/logoLogin.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Asume que login es una función asíncrona
  const togglePassword = () => setShowPassword(!showPassword);
  
  const [credenciales, setCredenciales] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredenciales((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    try {
      console.log("Intentando iniciar sesión con:", credenciales);    
      const loginStatus = await login(credenciales);

      if (loginStatus) {
        console.log("Inicio de sesión exitoso");        
        navigate("/"); // Redirigir al usuario
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Hubo un problema al iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <form className="container" onSubmit={onSubmit}>
      <img src={logoLogin} alt="logo" />
      <div className="input-group">
        <input
          type="text"
          placeholder="Nombre de usuario..."
          name="username"
          value={credenciales.user}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <div className="password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña..."
            name="password"
            value={credenciales.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={togglePassword}
            id="password-toggle"
          >
            {showPassword ? (
              <IoMdEyeOff className="ojo" />
            ) : (
              <IoMdEye className="ojo" />
            )}
          </button>
        </div>
      </div>

      <button type="submit" className="button">
        Iniciar sesión
      </button>
    </form>
  );
};
