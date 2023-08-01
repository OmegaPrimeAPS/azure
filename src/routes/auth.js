// auth.js
const express = require('express');
const router = express.Router();
const conectarBaseDeDatos = require('../db');
const userController = require('../controllers/user.controller');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const db = await conectarBaseDeDatos();
    if (!db) {
      return res.status(500).json({ message: 'Error de conexión a la base de datos' });
    }

    // Aquí puedes continuar con la lógica de registro de usuarios usando el controlador
    userController.crearUsuario(req, res, db);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return res.status(500).json({ message: 'Error de conexión a la base de datos' });
  }
});
router.post('/login', async (req, res) => {
    try {
      const db = await conectarBaseDeDatos();
      if (!db) {
        return res.status(500).json({ message: 'Error de conexión a la base de datos' });
      }
  
      // Aquí puedes continuar con la lógica de autenticación usando el controlador
      userController.autenticarUsuario(req, res, db);
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      return res.status(500).json({ message: 'Error de conexión a la base de datos' });
    }
  });

module.exports = router;
