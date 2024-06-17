const mongoose = require('mongoose')

// Esquema de la colección Estadias
const estadiaSchema = new mongoose.Schema(
  {
    idAsesor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'asesores',
      default: null,
      required: false
    },
    idAlumno: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'alumnos'
    },
    cartaPresentacion: {
      type: Object,
      default: null,
      required: false
    },
    anteproyecto: {
      type: Object,
      default: null,
      required: false
    },
    avance: {
      type: Object,
      default: null,
      required: false
    },
    documentos: {
      type: Object,
      default: null,
      required: false
    }
  },
  {
    collection: 'estadias'
  }
)

module.exports = mongoose.model('Estadia', estadiaSchema)