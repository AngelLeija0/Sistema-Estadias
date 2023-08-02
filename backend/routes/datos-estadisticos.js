const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const express = require('express');
const router = express.Router();

const path = require('path');

const ExcelJS = require('exceljs');

const Estadia = require('../models/estadia');
const Asesor = require('../models/asesor');
const Alumno = require('../models/alumno');
const Vinculador = require('../models/vinculador');

// POST - Busqueda de alumnos liberados del proceso de estadias
router.post('/estadias/alumnos', async (req, res) => {
    try {
        let alumnosEntrantes = [];
        let alumnosSalientes = [];
        const filtro = req.body.filter;
        const busqueda = {};
        if (filtro?.year) {
            busqueda["cartaPresentacion.datosAcademicos.año"] = filtro.año;
        }
        if (filtro?.period) {
            busqueda["cartaPresentacion.datosAcademicos.periodo"] = filtro.periodo;
        }
        const estadias = await Estadia.find(busqueda);
        for (const estadia of estadias) {
            const idAlumno = estadia._doc.idAlumno;
            const busqueda = {
                _id: new ObjectId(idAlumno)
            };
            if (filtro?.academicLevel) {
                busqueda["datosAcademicos.nivelAcademico"] = filtro.nivelAcademico;
            }
            if (filtro?.career) {
                busqueda["datosAcademicos.carrera"] = filtro.carrera;
            }
            if (filtro?.area) {
                busqueda["datosAcademicos.area"] = filtro.area;
            }
            if (filtro?.grade) {
                busqueda["datosAcademicos.grado"] = filtro.grado;
            }
            if (filtro?.group) {
                busqueda["datosAcademicos.grupo"] = filtro.grupo;
            }

            const alumno = await Alumno.findOne(busqueda);
            let infoAlumno = {}
            if (alumno) {
                infoAlumno = {
                    fullname: `${alumno.datosPersonales.nombres.nombre} ${alumno.datosPersonales.nombres.apPaterno} ${alumno.datosPersonales.nombres.apMaterno}`,
                    matricula: alumno.datosPersonales.privado.matricula,
                    academicLevel: alumno.datosAcademicos.nivelAcademico,
                    career: alumno.datosAcademicos.carrera,
                    area: alumno.datosAcademicos.area
                };
            }

            if (estadia.documentos?.etapas[5]?.estado === "Aceptada" && estadia.avance?.revision?.estado === "true") {
                alumnosSalientes.push(infoAlumno);
            }
            else {
                alumnosEntrantes.push(infoAlumno);
            }
        }
        res.json({
            initalStudents: {
                quantity: alumnosEntrantes.length,
                students: alumnosEntrantes
            },
            outgoingStudents: {
                quantity: alumnosSalientes.length,
                students: alumnosSalientes
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;