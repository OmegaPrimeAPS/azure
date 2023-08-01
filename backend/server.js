const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes');
const cors = require('cors')
const app = express();
const data = require('../public/data/data.json');
const PORT = 5000;
const axios = require('axios')
const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname, '../public/data/data.json');
const apiKey = 'f3b80c8d2c6a478e89445e919e625fff';
const randomCardUrl = 'https://randommer.io/api/Card';
const conectarBaseDeDatos = require('../src/db/conecction');
const userController = require('../src/controllers/user.controller'); // Importa el módulo que maneja la conexión a la base de datos



app.use(bodyParser.json());
app.use('/api', routes);
app.use(cors({ origin: 'http://localhost:3000' }));
app.post('http://localhost:5000/api/register', async (req, res) => {
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
app.get('/users', async (req, res) => {
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
      number: cardData.cardNumber,
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
app.get('/generateRandomCard', async (req, res) => {
  try {
    // Leer el archivo data.json
    const dataFilePath = path.join(__dirname, 'data', 'data.json');
    const jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    // Obtener los datos aleatorios de la API externa
    const response = await axios.post(randomCardUrl, {}, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    // Combinar los datos generados aleatoriamente con los datos del archivo data.json
    jsonData.cardInfo = {
      number: response.data.number,
      type: response.data.type,
      cvv: response.data.cvv,
      pin: response.data.pin,
      expiration: response.data.expiration,
    };

    res.json(jsonData);
  } catch (error) {
    console.error('Error fetching random card info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(async (req, res, next) => {
  const db = await conectarBaseDeDatos();
  if (!db) {
    return res.status(500).json({ message: 'Error de conexión a la base de datos' });
  }
  req.db = db; // Agrega la conexión a la base de datos al objeto req para que esté disponible en las rutas
  next();
});

app.put('http://localhost:5000/api/users/:id', (req, res) => {
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

