import React, { useState, useEffect } from 'react';
import Register from './Register'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showRegister, setShowRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor para autenticar al usuario
    // Por ejemplo, puedes utilizar fetch para realizar una solicitud a auth.js
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes manejar la respuesta del servidor
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });
  };
  const redirectToRegister = () => {
    // Cambiar el valor del estado showRegister para mostrar el componente Register
    setShowRegister(true);
  };

  useEffect(() => {
    if (showRegister) {
      // Hacer algo cuando showRegister es verdadero, por ejemplo, cambiar la vista para mostrar el componente Register
      console.log("Mostrando el componente Register");
    }
  }, [showRegister]);

  // Verificar si showRegister es verdadero, mostrar el componente Register
  if (showRegister) {
    return <Register />;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        <p>No tienes una cuenta? <span onClick={redirectToRegister}>Registrarse</span></p>
      </form>
    </div>
  );
};

export default Login;
