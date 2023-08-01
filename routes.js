const express = require('express');
const router = express.Router();
const data = require('./public/data/data.json');
const axios = require('axios')
const path = require('path');
const fs = require('fs');
const conectarBaseDeDatos = require('./src/db/conecction');
const userController = require('./src/controllers/user.controller');

const dataPath = path.join(__dirname, '../public/data/data.json');

router.get('/users', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const users = JSON.parse(data);
      res.json(users);
    });
  });
  router.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
  
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const users = JSON.parse(data);
      const index = users.findIndex((user) => user.id === userId);
  
      if (index !== -1) {
        users[index] = updatedUser;
  
        const updatedData = JSON.stringify(users);
  
        fs.writeFile(dataPath, updatedData, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
  
          res.json(updatedUser);
        });
      } else {
        res.sendStatus(404);
      }
    });
  });
  router.post('/users', async (req, res) => {
    const newUser = req.body;
  
    try {
      const response = await axios.get('https://randommer.io/api/Card', {
        headers: {
          'X-Api-Key': 'f3b80c8d2c6a478e89445e919e625fff'
        }
      });
  
      const cardData = response.data;
      newUser.cardInfo = {
        number: cardData.number,
        type: cardData.type,
        cvv: cardData.cvv,
        pin: cardData.pin,
        expiration: cardData.expiration,
      };
  
      data.push(newUser);
  
      const updatedData = JSON.stringify(data);
  
      fs.writeFile(dataPath, updatedData, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        res.status(201).json(newUser);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/users', async (req, res) => {
    const newUser = req.body;
    
    try {
      const response = await axios.get('https://randommer.io/api/Card', {
        headers: {
          'X-Api-Key': 'f3b80c8d2c6a478e89445e919e625fff'
        }
      });
      console.log(response)
      const cardData = response.data;
      newUser.cardInfo = {
        number: cardData.number,
        type: cardData.type,
        cvv: cardData.cvv,
        pin: cardData.pin,
        expiration: cardData.expiration,
      };
  
      data.push(newUser);
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


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