const bcrypt = require('bcrypt');

const saltRounds = 10; // Número de rounds para generar el salt

async function encriptarPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error al encriptar la contraseña');
  }
}

module.exports = { encriptarPassword };
