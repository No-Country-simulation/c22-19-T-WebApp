import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: {name: "pepe"} });

  const login = async (credentials) => {
    //console.log(credentials)
    try {
      // const response = await fetch("https://c2219twebapp.pythonanywhere.com/user/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",          
      //   },        
      //   body: JSON.stringify({"username": "c2219twebapp", "password": "oF4EI5BWzc0wZZt"}),
      // });
      /*
        https://c2219twebapp.pythonanywhere.com/user/login/ pasando username y password. POST 
        https://c2219twebapp.pythonanywhere.com/user/user/ para obtener los datos del usuario. GET
        https://c2219twebapp.pythonanywhere.com/user/logout/ POST
        https://c2219twebapp.pythonanywhere.com/user/get-csrf/ GET token
      */

      const responseToken = await axios.get("https://c2219twebapp.pythonanywhere.com/user/get-csrf/");
      const response = await axios.post("https://c2219twebapp.pythonanywhere.com/user/login/", credentials);
      const userAndPasswordMatch = response.status == 200;          
      

      if (!userAndPasswordMatch) {
        // throw new Error("Credenciales inválidas");
        return false;
      }
      
      /*hago la peticion user/user/ GET cabecera del token */
      const responseUserData = await axios.get(
        "https://c2219twebapp.pythonanywhere.com/user/user/",
        {
          headers: {
            "X-CSRFToken": responseToken.data.csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      //console.log(responseUserData.data.user);
      //para saber si esta logeado hacer la peticion de user/user/ con el token ...     
      
      setAuth({ user: responseUserData.data.user, token: responseToken.data.csrfToken});
      localStorage.setItem("token", responseToken.data.csrfToken);
      localStorage.setItem("user", JSON.stringify(responseUserData.data.user));

      return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
