import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./Login.css";
import logoLogin from "../../assets/logoLogin.svg"

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="container">
      <img src={logoLogin} alt="logo" />
      <div className="input-group">
        <input
          type="email"
          placeholder="Correo electrónico..."
          autoComplete="email"
        />
      </div>
      <div className="input-group">
        <div className="password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña..."
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="password-toggle"
            
          >
            {showPassword ? <IoMdEyeOff className="ojo" /> : <IoMdEye className="ojo"/>}
          </button>
        </div>
      </div>

      <button type="submit" className="button">
        Iniciar sesión
      </button>
    </form>
  );
};
