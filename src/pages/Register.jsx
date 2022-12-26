import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://blog-mysql-api-production.up.railway.app/api/auth/register", inputs);

      Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        text: 'Ahora puedes iniciar sesión',
      })

      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data)
      let errores = err.response.data.message.map(error => error.msg)

      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        // text: errores.join(', ')+'\n',
        // text: errores.join('<ul><li>'),
        html: '<ul style="list-style: none;font-size:15px"><li>' + errores.join('</li><li>') + '</li></ul>'
      })

      if (err.response.data.code === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: 'INTERNAL SERVER ERROR',
        })
      }

      // if (err.response.data.msg) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Hubo un error',
      //     text: err.msg,
      //   })
      // }



      // if (err.response.data.code === 500) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Hubo un error',
      //     text: 'INTERNAL SERVER ERROR',
      //   })
      // } else if (err.response.data.message) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Hubo un error',
      //     text: err.response.data.message,
      //   })
      // } else {
      //   let errores = err.response.data.message.map(error => error.msg)        
      //   Swal.fire({
      //     icon: 'warning',
      //     title: 'Hay problemas',
      //     html: '<ul style="list-style: none;font-size:15px"><li>' + errores.msg.join('</li><li>').toString() + '</li></ul>'
      //   })

      // }
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p style={{fontSize: "20px"}}>{err.msg}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
