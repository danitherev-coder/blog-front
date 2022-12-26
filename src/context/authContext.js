import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
    Swal.fire({
      icon: "success",
      title: `Hola ${res.data.username}!`,
      text: "Bienvenido a tu perfil"
    })
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);    
    Swal.fire({
      icon: "success",
      title: `Hasta pronto, ${currentUser.username}`,
      text: "Esperamos verte pronto"
    })
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
