const mongoose = require('mongoose')

// Esquema de la colección Administrador
const administradorSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    carrera: String,
    fechaRegistro: Date
  },
  {
    collection: 'administradores'
  }
)

module.exports = mongoose.model('Administrador', administradorSchema)
