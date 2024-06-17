const mongoose = require('mongoose')

// Esquema de la colección Administrador
const superAdminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    fechaRegistro: Date
  },
  {
    collection: 'superAdministradores'
  }
)

module.exports = mongoose.model('SuperAdministrador', superAdminSchema)
