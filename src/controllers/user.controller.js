const User = require('../models/user.models');
const { encriptarPassword } = require('../utils/encryptios');
const {ObjectId} = require ('mongodb');
const conectarBaseDeDatos = require('../db/conecction')
const bcrypt = require('bcrypt');

async function crearUsuario(req, res) {
  // Obtener datos del usuario desde el body de la solicitud
  const { id, nombre, apellido, ciudad, codigoPostal, email, password } = req.body;

  // Encriptar la contraseña
  const hashedPassword = await encriptarPassword(password);

  // Crear una nueva instancia de User
  const nuevoUsuario = new User(id, nombre, apellido, ciudad, codigoPostal, email, hashedPassword);

  // Lógica para guardar el nuevo usuario en la base de datos
  // ...

  // Responder con el nuevo usuario creado
  res.json(nuevoUsuario);
}
  
async function obtenerUsuarioPorId(idUsuario) {
    const db = await conectarBaseDeDatos();
  
    try {
      const coleccionUsuarios = db.collection('usuarios'); // Reemplaza 'usuarios' con el nombre de tu colección
  
      const usuario = await coleccionUsuarios.findOne({ _id: ObjectId(idUsuario) });
  
      return usuario;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      throw error;
    }
  }

  async function autenticarUsuario(req, res, db) {
    const { email, password } = req.body;
  
    try {
      const coleccionUsuarios = db.collection('usuarios');
  
      // Buscar el usuario por el correo electrónico
      const usuario = await coleccionUsuarios.findOne({ email });
  
      // Si no se encontró el usuario, enviar un mensaje de error
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Comprobar la contraseña con bcrypt
      const contraseñaValida = await bcrypt.compare(password, usuario.password);
  
      // Si la contraseña no es válida, enviar un mensaje de error
      if (!contraseñaValida) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      // Si la contraseña es válida, enviar un mensaje de éxito
      res.json({ message: 'Inicio de sesión exitoso' });
  
    } catch (error) {
      console.error('Error al autenticar al usuario:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }
  

  module.exports = { obtenerUsuarioPorId, autenticarUsuario, crearUsuario };