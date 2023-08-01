class User {
    constructor(id, nombre, apellido, ciudad, codigoPostal, email, password) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.ciudad = ciudad;
      this.codigoPostal = codigoPostal;
      this.email = email;
      this.password = password;
    }
  }
  
  module.exports = User;
  