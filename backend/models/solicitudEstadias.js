const mongoose = require("mongoose");

// Esquema de la colección de Solicitudes para Estadias
const estadiaSchema = new mongoose.Schema(
  {
    idAlumno: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "alumnos",
    },
    alumno: {
      nombres: {
        nombre: String,
        apPaterno: String,
        apMaterno: String,
      },
      privado: {
        matricula: String,
        email: String,
      },
      datosAcademicos: {
        nivelAcademico: String,
        turno: String,
        carrera: String,
        area: String,
        grado: String,
        grupo: String,
      },
    },
    progreso: String,
    nombreEmpresa: String,
    creado_el: Date,
  },
  {
    collection: "solicitud-estadias",
  }
);

module.exports = mongoose.model("SolicitudEstadia", estadiaSchema);
