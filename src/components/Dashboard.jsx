import React, { useState } from 'react';
import UserForm from './UserForm';
import { v4 as uuidv4 } from 'uuid';
import UserCard from './UserCard';
import axios from 'axios';

const Dashboard = ({ users, onAddUser, onUpdateUser, onDeleteUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  const handleAddClick = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteClick = (user) => {
    onDeleteUser(user.id);
  };

  const handleUserSubmit = async(user) => {
    if(!selectedUser){
      try{
        const response = await axios.get('/generateRandomCard');
        const {number,type,cvv,pin, expiration} = response.data;
        const newUser = {
          id: uuidv4(),
          ...user,
          cardInfo:{
            number, type, cvv, pin,expiration
          },
        };
        onAddUser(newUser);
      }catch (error) {
        console.error('Error fetching random card info:', error);
        // Manejar el error adecuadamente
      }
    }else{
      onUpdateUser({...selectedUser,...user});
    }
    setSelectedUser(null);
    setShowModal(false);
  };
  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false); // Ocultar el modal al hacer clic en "Cancelar" o al cerrarlo
  };

  return (
    <div>
    <h1>Dashboard</h1>
    <button onClick={handleAddClick}>Add User</button>
    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
        onUpdateStatus={(userId, status) =>
          onUpdateUser(userId, { ...user, status })
        }
      />
    ))}
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <UserForm user={selectedUser} onSubmit={handleUserSubmit} />
        </div>
      </div>
    )}
  </div>
  );
};

export default Dashboard;