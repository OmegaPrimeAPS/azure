import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import data from './data/data.json';
import axios from 'axios';


const App = () => {
  const [users, setUsers] = useState(data);
  const [formData, setFormData] = useState(null); // Eliminamos el estado inicial del formulario
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleAddUser = async () => {
    try {
      // Lógica para obtener la información de la tarjeta de crédito desde el servidor
      const response = await axios.get('/generateRandomCard');
      const cardData = response.data;
      setIsUserLoggedIn(true);

      // Agregar el nuevo usuario con la información de la tarjeta de crédito generada automáticamente
      const newUser = {
        ...formData, // Cambiar esto por el estado correcto que tienes en tu formulario
        id: users.length + 1,
        cardInfo: {
          number: cardData.number,
          type: cardData.type,
          cvv: cardData.cvv,
          pin: cardData.pin,
          expiration: cardData.expiration,
        },
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);
      setFormData(null); // Limpiar el formulario después de agregar un usuario
    } catch (error) {
      console.error('Error fetching random card info:', error);
    }
  };

  const handleUpdateUser = (userId, updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    // Mostrar el componente Login si el usuario no está logueado
    setShowLogin(!isUserLoggedIn);
  }, [isUserLoggedIn]);

  if (showLogin) {
    return <Login />;
  }
  return (
    <div className="App">
      
      <Dashboard
        users={users}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default App;