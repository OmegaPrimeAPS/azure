import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setStatus(user.status);
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: user ? user.id : Date.now().toString(),
      name,
      status
    };

    onSubmit(newUser);
    setName('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Status:
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="EN PROCESO">EN PROCESO</option>
          <option value="COMPLETADO">COMPLETADO</option>
        </select>
      </label>
      <button type="submit">{user ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default UserForm;