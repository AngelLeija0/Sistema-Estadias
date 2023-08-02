const mongoose = require('mongoose')

// Esquema de la colección Administrador
const administracionSchema = new mongoose.Schema(
  {
    carrera: {
        nombre: String,
        etapas: {
            etapa1: {
                estado: {
                    type: String,
                    default: null
                },
                fecha: {
                    type: Date,
                    default: null
                }
            },
            etapa2: {
                estado: {
                    type: String,
                    default: null
                },
                fecha: {
                    type: Date,
                    default: null
                }
            },
            etapa3: {
                estado: {
                    type: String,
                    default: null
                },
                fecha: {
                    type: Date,
                    default: null
                }
            },
            etapa4: {
                estado: {
                    type: String,
                    default: null
                },
                fecha: {
                    type: Date,
                    default: null
                }
            },
            etapa5: {
                estado: {
                    type: String,
                    default: null
                },
                fecha: {
                    type: Date,
                    default: null
                }
            },
        },
    },
  },
  {
    collection: 'administracion'
  }
)

module.exports = mongoose.model('Administracion', administracionSchema)
