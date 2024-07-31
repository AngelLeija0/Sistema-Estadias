const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const Vinculador = require("../models/vinculador");
const Estadia = require("../models/estadia");
const Alumno = require("../models/alumno");
const SolicitudEstadia = require("../models/solicitudEstadias");

/* Vinculacion */

// POST - Busqueda de todos los vinculadores
router.post("/vinculadores", async (req, res) => {
  try {
    const filtro = req.body.filtro;
    const busqueda = {};
    if (filtro.buscador) {
      const textoBusqueda = filtro.buscador;
      const regex = new RegExp(textoBusqueda, "i");
      busqueda.$or = [
        { "datosPersonales.nombres.nombre": regex },
        { "datosPersonales.nombres.apPaterno": regex },
        { "datosPersonales.nombres.apMaterno": regex },
      ];
      const numeroPartes = textoBusqueda.split(" ");
      if (numeroPartes.length >= 2) {
        const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
        const apPaterno = numeroPartes[numeroPartes.length - 2];
        const apMaterno = numeroPartes[numeroPartes.length - 1];
        busqueda.$or.push({ "datosPersonales.nombres.nombre": nombre });
        busqueda.$or.push({ "datosPersonales.nombres.apPaterno": apPaterno });
        busqueda.$or.push({ "datosPersonales.nombres.apMaterno": apMaterno });
      }
    }
    const vinculadores = await Vinculador.find(busqueda);
    let arrVinculadores = [];
    for (const vinculador of vinculadores) {
      const infoVinculador = {
        idVinculador: vinculador._id,
        nombre: vinculador.datosPersonales.nombres.nombre,
        apPaterno: vinculador.datosPersonales.nombres.apPaterno,
        apMaterno: vinculador.datosPersonales.nombres.apMaterno,
        email: vinculador.datosPersonales.privado.email,
        password: vinculador.datosPersonales.privado.password,
        username: vinculador.datosPersonales.privado.username,
      };
      arrVinculadores.push(infoVinculador);
    }
    res.json(arrVinculadores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Busqueda de todos los vinculadores
router.post("/vinculadores/excel", async (req, res) => {
  try {
    const filtro = req.body.filtro;
    const busqueda = {};
    if (filtro.buscador) {
      const textoBusqueda = filtro.buscador;
      const regex = new RegExp(textoBusqueda, "i");
      busqueda.$or = [
        { "datosPersonales.nombres.nombre": regex },
        { "datosPersonales.nombres.apPaterno": regex },
        { "datosPersonales.nombres.apMaterno": regex },
      ];
      const numeroPartes = textoBusqueda.split(" ");
      if (numeroPartes.length >= 2) {
        const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
        const apPaterno = numeroPartes[numeroPartes.length - 2];
        const apMaterno = numeroPartes[numeroPartes.length - 1];
        busqueda.$or.push({ "datosPersonales.nombres.nombre": nombre });
        busqueda.$or.push({ "datosPersonales.nombres.apPaterno": apPaterno });
        busqueda.$or.push({ "datosPersonales.nombres.apMaterno": apMaterno });
      }
    }
    const vinculadores = await Vinculador.find(busqueda);
    let arrVinculadores = [];
    for (const vinculador of vinculadores) {
      const infoVinculador = {
        idVinculador: vinculador._id,
        nombre: vinculador.datosPersonales.nombres.nombre,
        apPaterno: vinculador.datosPersonales.nombres.apPaterno,
        apMaterno: vinculador.datosPersonales.nombres.apMaterno,
        email: vinculador.datosPersonales.privado.email,
        password: vinculador.datosPersonales.privado.password,
        username: vinculador.datosPersonales.privado.username,
      };
      arrVinculadores.push(infoVinculador);
    }

    const data = arrVinculadores;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos");

    worksheet.columns = [
      { header: "Nombre", key: "nombre" },
      { header: "Apellido paterno", key: "apPaterno" },
      { header: "Apellido materno", key: "apMaterno" },
      { header: "Correo", key: "email" },
      { header: "Usuario", key: "username" },
    ];

    data.forEach((row) => {
      worksheet.addRow(row);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=alumnos-liberados.xlsx"
    );

    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Crear nuevo vinculador
router.post("/vinculador/crear", async (req, res) => {
  try {
    const password = req.body.vinculador.datosPersonales.privado.password;

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error("Error al generar el hash de la contraseña");
      }
      const vinculador = new Vinculador({
        datosPersonales: {
          nombres: {
            nombre: req.body.vinculador.datosPersonales.nombres.nombre,
            apPaterno: req.body.vinculador.datosPersonales.nombres.apPaterno,
            apMaterno: req.body.vinculador.datosPersonales.nombres.apMaterno,
          },
          privado: {
            email: req.body.vinculador.datosPersonales.privado.email,
            username: req.body.vinculador.datosPersonales.privado.username,
            password: hash,
          },
        },
        fechaRegistro: new Date(req.body.vinculador.fechaRegistro),
      });
      const newVinculador = await vinculador.save();
      res.status(201).json(newVinculador);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST - Perfil de vinculador (informacion general)
router.post("/vinculador/perfil", async (req, res) => {
  try {
    const idVinculador = req.body.vinculador;
    const vinculador = await Vinculador.findById(idVinculador);
    res.json(vinculador);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/vinculador/perfil/modificar", async (req, res) => {
  try {
    const idVinculador = req.body.vinculador.idVinculador;
    const vinculador = await Vinculador.findById(idVinculador);

    const newPassword = req.body.vinculador.datosPersonales.privado.password;
    const currentPassword = vinculador.datosPersonales.privado.password;

    if (newPassword && newPassword !== currentPassword) {
      bcrypt.hash(newPassword, 10, async (err, hash) => {
        if (err) {
          throw new Error("Error al generar el hash de la contraseña");
        }
        vinculador.datosPersonales.privado.password = hash;
        await saveVinculador(vinculador, res, req.body);
      });
    } else {
      await saveVinculador(vinculador, res, req.body);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function saveVinculador(vinculador, res, body) {
  try {
    vinculador.estado = body.vinculador.estado || vinculador.estado;

    vinculador.datosPersonales.nombres.nombre =
      body.vinculador.datosPersonales.nombres.nombre ||
      vinculador.datosPersonales.nombres.nombre;
    vinculador.datosPersonales.nombres.apPaterno =
      body.vinculador.datosPersonales.nombres.apPaterno ||
      vinculador.datosPersonales.nombres.apPaterno;
    vinculador.datosPersonales.nombres.apMaterno =
      body.vinculador.datosPersonales.nombres.apMaterno ||
      vinculador.datosPersonales.nombres.apMaterno;

    vinculador.datosPersonales.privado.email =
      body.vinculador.datosPersonales.privado.email ||
      vinculador.datosPersonales.privado.email;
    vinculador.datosPersonales.privado.username =
      body.vinculador.datosPersonales.privado.username ||
      vinculador.datosPersonales.privado.username;

    const newVinculador = await vinculador.save();
    res.status(201).json(newVinculador);
  } catch (error) {
    throw new Error("Error al guardar el asesor");
  }
}

// DELETE - Borrar vinculador
router.post("/vinculador/perfil/borrar", async (req, res) => {
  try {
    const idVinculador = req.body.vinculador;
    const vinculador = await Vinculador.findByIdAndDelete(idVinculador);
    if (vinculador) {
      return res.status(202).json("Vinculador eliminado correctamente");
    }
    res.status(204).json();
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
});

// POST - Busqueda de alumnos sin iniciar proceso de estadias
router.get("/alumnos/sin-iniciar", async (req, res) => {
  try {
    let alumnos = [];
    const estadias = await Estadia.find().sort({ fechaRegistro: -1 });
    for (const estadia of estadias) {
      if (!enProceso(estadia)) {
        const idAlumno = estadia._doc.idAlumno;
        const cv = estadia.documentos['cve.pdf']?.archivo;
        const busqueda = {
          _id: new ObjectId(idAlumno),
        };
        const alumno = await Alumno.findOne(busqueda);
        if (alumno) {
          const solicitud = await SolicitudEstadia.findOne({ idAlumno });
          const infoAlumno = {
            idAlumno: idAlumno,
            nombre: alumno.datosPersonales.nombres.nombre,
            apPaterno: alumno.datosPersonales.nombres.apPaterno,
            apMaterno: alumno.datosPersonales.nombres.apMaterno,
            matricula: alumno.datosPersonales.privado.matricula,
            nivelAcademico: alumno.datosAcademicos.nivelAcademico,
            carrera: alumno.datosAcademicos.carrera,
            area: alumno.datosAcademicos.area,
            grado: alumno.datosAcademicos.grado,
            grupo: alumno.datosAcademicos.grupo,
            fechaRegistro: alumno.fechaRegistro,
            ayuda: solicitud ? solicitud.progreso : 'Solicitud no realizada',
            empresa: solicitud ? solicitud.nombreEmpresa : 'Solicitud no realizada',
            cv: cv || "No se encontro CV"
          };
          alumnos.push(infoAlumno);
        }
      }
    }
    if (alumnos.length === 0 || alumnos === null) {
      return res.json("No se encontraron alumnos");
    }
    alumnos.sort((alumnoA, alumnoB) => {
      const fechaRegistroA = new Date(alumnoA.fechaRegistro);
      const fechaRegistroB = new Date(alumnoB.fechaRegistro);
      return fechaRegistroB - fechaRegistroA;
    });
    res.json(alumnos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

function enProceso(estadia) {
  try {
    if (estadia.cartaPresentacion !== null && !procesoTerminado(estadia)) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

function procesoTerminado(estadia) {
  try {
    if (
      estadia.cartaPresentacion?.estado?.nombre === "Aceptada" &&
      estadia.anteproyecto?.estado?.nombre === "Aceptada" &&
      documentacionCompleta(estadia.documentos) &&
      avanceCompleto(estadia.avance)
    ) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

function avanceCompleto(avance) {
  try {
    if (
      avance.anteproyecto?.estado === "true" &&
      avance["25%"]?.estado === "true" &&
      avance["50%"]?.estado === "true" &&
      avance["75%"]?.estado === "true" &&
      avance["100%"]?.estado === "true" &&
      avance.revision?.estado === "true"
    ) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

function documentacionCompleta(documentos) {
  try {
    const requiredDocs = [
      "cve.pdf",
      "cvi.pdf",
      "cpa.pdf",
      "caa.pdf",
      "nss.pdf",
      "dictamen.pdf",
      "protesta.pdf",
      "rubrica.pdf",
      "reporte.pdf",
      "ctp.pdf",
    ];

    if (Object.keys(documentos).length === 0) {
      return false;
    }

    const results = [];
    for (const doc of requiredDocs) {
      if (!documentos[doc] || documentos[doc]?.estado !== "Aceptada") {
        results.push(false);
      }
    }
    if (results.includes(false)) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = router;
