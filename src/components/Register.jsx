import React, {useState, useEffect} from 'react'
import Login from './Login'
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        ciudad: '',
        codigoPostal: '',
        email: '',
        password: '',
      });
      const [showLogin ,setShowLogin] = useState(false);

      const handleChange =(e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
      }
      /* const handleSubmit = (e) => {
        e.preventDefault();
        
        // Aquí puedes enviar los datos del formulario al servidor para realizar el registro
        axios.post('/api/register', formData, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          // Manejar la respuesta del servidor, por ejemplo, redireccionar a una página de inicio de sesión exitoso
          console.log(response.data);
          // Redireccionar al usuario a la página de inicio de sesión después del registro exitoso
          setShowLogin(true);
        })
        .catch((error) => {
          console.error('Error al registrar usuario:', error);
        });
      }; */
      const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario al servidor para realizar el registro
        fetch('http://localhost:5000/api/register', {
          mode: 'no-cors',  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            // Manejar la respuesta del servidor, por ejemplo, redireccionar a una página de inicio de sesión exitoso
            console.log(data);
            // Redireccionar al usuario a la página de inicio de sesión después del registro exitoso
            setShowLogin(true);
          })
          .catch((error) => {
            console.error('Error al registrar usuario:', error);
          });
        console.log(formData);
      };
      

        const redirectToLogin = () => {
                // Cambiar el valor del estado showRegister para mostrar el componente Register
                setShowLogin(true);
         };
    
      useEffect(() => {
        if (showLogin) {
          // Hacer algo cuando showRegister es verdadero, por ejemplo, cambiar la vista para mostrar el componente Register
          console.log("Mostrando el componente Register");
        }
      }, [showLogin]);
    
      // Verificar si showRegister es verdadero, mostrar el componente Register
      if (showLogin) {
        return <Login />;
      }
    
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">Ciudad</label>
          <input type="text" className="form-control" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
          <input type="text" className="form-control" id="codigoPostal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
        <p>Ya tienes una cuenta? <span onClick={redirectToLogin}>Login</span></p>
      </form>
    </div>
  )
}

export default Register