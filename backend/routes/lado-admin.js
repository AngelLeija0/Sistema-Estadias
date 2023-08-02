const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { PDFDocument, rgb } = require('pdf-lib');

const ExcelJS = require('exceljs');

const bcrypt = require('bcrypt');

const Estadia = require('../models/estadia');
const Asesor = require('../models/asesor');
const Alumno = require('../models/alumno');
const Administrador = require('../models/administrador');
const Administracion = require('../models/administracion');


/* Administracion */

// POST - Buscar informacion de cada una de las etapas
router.post('/administracion/etapas', async (req, res) => {
    try {
        const carrera = req.body.carrera;
        const administraciones = await Administracion.find();
        let arrEtapas = [];
        for (const administracion of administraciones) {
            arrEtapas.push(administracion.carrera.etapas);
        }
        res.json(arrEtapas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Activar o desactivar etapas
router.post('/administracion/etapa/toggle', async (req, res) => {
    try {
        const etapa = req.body.etapa;
        const estado = req.body.estado;
        const carrera = req.body.carrera;
        const administracion = await Administracion.findOne();
        if (etapa == 1) {
            administracion.carrera.etapas.etapa1.estado = estado;
            administracion.carrera.etapas.etapa1.fecha = new Date();
        } else if (etapa == 2) {
            administracion.carrera.etapas.etapa2.estado = estado;
            administracion.carrera.etapas.etapa2.fecha = new Date();
        } else if (etapa == 3) {
            administracion.carrera.etapas.etapa3.estado = estado;
            administracion.carrera.etapas.etapa3.fecha = new Date();
        } else if (etapa == 4) {
            administracion.carrera.etapas.etapa4.estado = estado;
            administracion.carrera.etapas.etapa4.fecha = new Date();
        } else if (etapa == 5) {
            administracion.carrera.etapas.etapa5.estado = estado;
            administracion.carrera.etapas.etapa5.fecha = new Date();
        }
        await administracion.save();

        return res.json({
            etapa: etapa,
            estado: estado,
            fecha: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/* Alumnos */

// POST - Busqueda de alumnos en proceso de estadias
router.post('/alumnos/proceso', async (req, res) => {
    try {
        let alumnos = [];
        const filtro = req.body.filtro;
        const filtroEstadia = {};
        if (filtro.avance) {
            const avanceKeys = Object.keys(filtro.avance);
            avanceKeys.forEach(key => {
                const porcentaje = filtro.avance[key];
                const etapaKey = `avance.${key}`;
                filtroEstadia[etapaKey] = { $exists: true };
                filtroEstadia['avance.progreso'] = porcentaje;
            });
        }
        const estadias = await Estadia.find(filtroEstadia);
        for (const estadia of estadias) {
            if (!estadia.documentos || !estadia.documentos.cta || estadia.documentos.cta.estado.nombre !== "Aceptada") {
                const idAlumno = estadia._doc.idAlumno;
                const busqueda = {
                    _id: new ObjectId(idAlumno)
                };
                if (filtro.buscador) {
                    const textoBusqueda = filtro.buscador;
                    const regex = new RegExp(textoBusqueda, 'i');
                    busqueda.$or = [
                        { 'datosPersonales.nombres.nombre': regex },
                        { 'datosPersonales.nombres.apPaterno': regex },
                        { 'datosPersonales.nombres.apMaterno': regex },
                        { 'datosPersonales.privado.matricula': regex },
                    ];
                    const numeroPartes = textoBusqueda.split(" ");
                    if (numeroPartes.length >= 2) {
                        const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                        const apPaterno = numeroPartes[numeroPartes.length - 2];
                        const apMaterno = numeroPartes[numeroPartes.length - 1];
                        busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                        busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                        busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
                    }
                }
                if (filtro.nivelAcademico) {
                    busqueda["datosAcademicos.nivelAcademico"] = filtro.nivelAcademico;
                }
                if (filtro.carrera) {
                    busqueda["datosAcademicos.carrera"] = filtro.carrera;
                }
                if (filtro.area) {
                    busqueda["datosAcademicos.area"] = filtro.area;
                }
                if (filtro.grado) {
                    busqueda["datosAcademicos.grado"] = filtro.grado;
                }
                if (filtro.grupo) {
                    busqueda["datosAcademicos.grupo"] = filtro.grupo;
                }
                const alumno = await Alumno.findOne(busqueda);
                if (alumno) {
                    const infoAlumno = {
                        idAlumno: idAlumno,
                        nombre: alumno.datosPersonales.nombres.nombre,
                        apPaterno: alumno.datosPersonales.nombres.apPaterno,
                        apMaterno: alumno.datosPersonales.nombres.apMaterno,
                        matricula: alumno.datosPersonales.privado.matricula,
                        nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                        carrera: alumno.datosAcademicos.carrera,
                        area: alumno.datosAcademicos.area
                    };
                    alumnos.push(infoAlumno);
                }
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Generar excel de alumnos en proceso de estadias (General)
router.post('/alumnos/proceso/excel-general', async (req, res) => {
    try {
        let alumnos = [];
        const estadias = await Estadia.find();
        for (const estadia of estadias) {
            if (!estadia.documentos || !estadia.documentos.cta || estadia.documentos.cta.estado.nombre !== "Aceptada") {
                const idAlumno = estadia._doc.idAlumno;
                const busqueda = {
                    _id: new ObjectId(idAlumno)
                };
                const alumno = await Alumno.findOne(busqueda);
                if (alumno) {
                    const infoAlumno = {
                        idAlumno: idAlumno,
                        nombre: alumno.datosPersonales.nombres.nombre,
                        apPaterno: alumno.datosPersonales.nombres.apPaterno,
                        apMaterno: alumno.datosPersonales.nombres.apMaterno,
                        matricula: alumno.datosPersonales.privado.matricula,
                        nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                        carrera: alumno.datosAcademicos.carrera,
                        area: alumno.datosAcademicos.area
                    };
                    alumnos.push(infoAlumno);
                }
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }

        const data = alumnos;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Apellido paterno', key: 'apPaterno' },
            { header: 'Apellido materno', key: 'apMaterno' },
            { header: 'Matricula', key: 'matricula' },
            { header: 'Nivel academico', key: 'nivelAcademico' },
            { header: 'Carrera', key: 'carrera' },
            { header: 'Area', key: 'area' },
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos-en-proceso.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Generar excel de alumnos en proceso de estadias (filtrados por nivel academico, carrera o area)
router.post('/alumnos/proceso/excel', async (req, res) => {
    try {
        let alumnos = [];
        const filtro = req.body.filtro;
        const filtroEstadia = {};
        if (filtro.avance) {
            const avanceKeys = Object.keys(filtro.avance);
            avanceKeys.forEach(key => {
                const porcentaje = filtro.avance[key];
                const etapaKey = `avance.${key}`;
                filtroEstadia[etapaKey] = { $exists: true };
                filtroEstadia['avance.progreso'] = porcentaje;
            });
        }
        const estadias = await Estadia.find(filtroEstadia);
        for (const estadia of estadias) {
            if (!estadia.documentos || !estadia.documentos.cta || estadia.documentos.cta.estado.nombre !== "Aceptada") {
                const idAlumno = estadia._doc.idAlumno;
                const busqueda = {
                    _id: new ObjectId(idAlumno)
                };
                if (filtro.buscador) {
                    const textoBusqueda = filtro.buscador;
                    const regex = new RegExp(textoBusqueda, 'i');
                    busqueda.$or = [
                        { 'datosPersonales.nombres.nombre': regex },
                        { 'datosPersonales.nombres.apPaterno': regex },
                        { 'datosPersonales.nombres.apMaterno': regex },
                        { 'datosPersonales.privado.matricula': regex },
                    ];
                    const numeroPartes = textoBusqueda.split(" ");
                    if (numeroPartes.length >= 2) {
                        const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                        const apPaterno = numeroPartes[numeroPartes.length - 2];
                        const apMaterno = numeroPartes[numeroPartes.length - 1];
                        busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                        busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                        busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
                    }
                }
                if (filtro.nivelAcademico) {
                    busqueda["datosAcademicos.nivelAcademico"] = filtro.nivelAcademico;
                }
                if (filtro.carrera) {
                    busqueda["datosAcademicos.carrera"] = filtro.carrera;
                }
                if (filtro.area) {
                    busqueda["datosAcademicos.area"] = filtro.area;
                }
                if (filtro.grado) {
                    busqueda["datosAcademicos.grado"] = filtro.grado;
                }
                if (filtro.grupo) {
                    busqueda["datosAcademicos.grupo"] = filtro.grupo;
                }
                const alumno = await Alumno.findOne(busqueda);
                if (alumno) {
                    const infoAlumno = {
                        idAlumno: idAlumno,
                        nombre: alumno.datosPersonales.nombres.nombre,
                        apPaterno: alumno.datosPersonales.nombres.apPaterno,
                        apMaterno: alumno.datosPersonales.nombres.apMaterno,
                        matricula: alumno.datosPersonales.privado.matricula,
                        nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                        carrera: alumno.datosAcademicos.carrera,
                        area: alumno.datosAcademicos.area
                    };
                    alumnos.push(infoAlumno);
                }
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }

        const data = alumnos;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Apellido paterno', key: 'apPaterno' },
            { header: 'Apellido materno', key: 'apMaterno' },
            { header: 'Matricula', key: 'matricula' },
            { header: 'Nivel academico', key: 'nivelAcademico' },
            { header: 'Carrera', key: 'carrera' },
            { header: 'Area', key: 'area' },
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos-en-proceso.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Busqueda de alumnos liberados del proceso de estadias
router.post('/alumnos/liberados', async (req, res) => {
    try {
        let alumnos = [];
        const filtro = req.body.filtro;
        const busqueda = {};
        if (filtro.año) {
            busqueda["cartaPresentacion.datosAcademicos.año"] = filtro.año;
        }
        if (filtro.periodo) {
            busqueda["cartaPresentacion.datosAcademicos.periodo"] = filtro.periodo;
        }
        const estadias = await Estadia.find(busqueda);
        for (const estadia of estadias) {
            if (estadia.documentos?.etapas[5]?.estado === "Aceptada" && estadia.avance?.revision?.estado === "true") {
                const idAlumno = estadia._doc.idAlumno;
                const busqueda = {
                    _id: new ObjectId(idAlumno)
                };
                if (filtro.buscador) {
                    const textoBusqueda = filtro.buscador;
                    const regex = new RegExp(textoBusqueda, 'i');
                    busqueda.$or = [
                        { 'datosPersonales.nombres.nombre': regex },
                        { 'datosPersonales.nombres.apPaterno': regex },
                        { 'datosPersonales.nombres.apMaterno': regex },
                        { 'datosPersonales.privado.matricula': regex },
                    ];
                    const numeroPartes = textoBusqueda.split(" ");
                    if (numeroPartes.length >= 2) {
                        const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                        const apPaterno = numeroPartes[numeroPartes.length - 2];
                        const apMaterno = numeroPartes[numeroPartes.length - 1];
                        busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                        busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                        busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
                    }
                }
                if (filtro.nivelAcademico) {
                    busqueda["datosAcademicos.nivelAcademico"] = filtro.nivelAcademico;
                }
                if (filtro.carrera) {
                    busqueda["datosAcademicos.carrera"] = filtro.carrera;
                }
                if (filtro.area) {
                    busqueda["datosAcademicos.area"] = filtro.area;
                }
                if (filtro.grado) {
                    busqueda["datosAcademicos.grado"] = filtro.grado;
                }
                if (filtro.grupo) {
                    busqueda["datosAcademicos.grupo"] = filtro.grupo;
                }
                const alumno = await Alumno.findOne(busqueda);
                if (alumno) {
                    const infoAlumno = {
                        idAlumno: idAlumno,
                        nombre: alumno.datosPersonales.nombres.nombre,
                        apPaterno: alumno.datosPersonales.nombres.apPaterno,
                        apMaterno: alumno.datosPersonales.nombres.apMaterno,
                        matricula: alumno.datosPersonales.privado.matricula,
                        nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                        carrera: alumno.datosAcademicos.carrera,
                        area: alumno.datosAcademicos.area
                    };
                    alumnos.push(infoAlumno);
                }
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Generar Excel de alumnos liberados del proceso de estadias (filtrado)
router.post('/alumnos/liberados/excel', async (req, res) => {
    try {
        let alumnos = [];
        const filtro = req.body.filtro
        const busqueda = {}
        if (filtro.buscador) {
            return res.status(500).json({ message: "No se puede generar un archivo de Excel para un solo alumno." });
        }
        if (filtro.año) {
            busqueda["cartaPresentacion.datosAcademicos.año"] = filtro.año;
        }
        if (filtro.periodo) {
            busqueda["cartaPresentacion.datosAcademicos.periodo"] = filtro.periodo;
        }
        const estadias = await Estadia.find(busqueda);
        for (const estadia of estadias) {
            if (estadia.documentos?.etapas[5]?.estado === "Aceptada" && estadia.avance?.revision?.estado === "true") {
                const idAlumno = estadia._doc.idAlumno;
                const busqueda = {
                    _id: new ObjectId(idAlumno)
                };
                if (filtro.buscador) {
                    const textoBusqueda = filtro.buscador;
                    const regex = new RegExp(textoBusqueda, 'i');
                    busqueda.$or = [
                        { 'datosPersonales.nombres.nombre': regex },
                        { 'datosPersonales.nombres.apPaterno': regex },
                        { 'datosPersonales.nombres.apMaterno': regex },
                        { 'datosPersonales.privado.matricula': regex },
                    ];
                    const numeroPartes = textoBusqueda.split(" ");
                    if (numeroPartes.length >= 2) {
                        const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                        const apPaterno = numeroPartes[numeroPartes.length - 2];
                        const apMaterno = numeroPartes[numeroPartes.length - 1];
                        busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                        busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                        busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
                    }
                }
                if (filtro.nivelAcademico) {
                    busqueda["datosAcademicos.nivelAcademico"] = filtro.nivelAcademico;
                }
                if (filtro.carrera) {
                    busqueda["datosAcademicos.carrera"] = filtro.carrera;
                }
                if (filtro.area) {
                    busqueda["datosAcademicos.area"] = filtro.area;
                }
                if (filtro.grado) {
                    busqueda["datosAcademicos.grado"] = filtro.grado;
                }
                if (filtro.grupo) {
                    busqueda["datosAcademicos.grupo"] = filtro.grupo;
                }
                const alumno = await Alumno.findOne(busqueda);
                if (alumno) {
                    const infoAlumno = {
                        idAlumno: idAlumno,
                        nombre: alumno.datosPersonales.nombres.nombre,
                        apPaterno: alumno.datosPersonales.nombres.apPaterno,
                        apMaterno: alumno.datosPersonales.nombres.apMaterno,
                        matricula: alumno.datosPersonales.privado.matricula,
                        nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                        carrera: alumno.datosAcademicos.carrera,
                        area: alumno.datosAcademicos.area
                    };
                    alumnos.push(infoAlumno);
                }
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }
        const data = alumnos;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Apellido paterno', key: 'apPaterno' },
            { header: 'Apellido materno', key: 'apMaterno' },
            { header: 'Matricula', key: 'matricula' },
            { header: 'Nivel academico', key: 'nivelAcademico' },
            { header: 'Carrera', key: 'carrera' },
            { header: 'Area', key: 'area' },
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos-liberados.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Generar Excel de alumnos liberados del proceso de estadias (General)
router.post('/alumnos/liberados/excel-general', async (req, res) => {
    try {
        let alumnos = [];
        const filtro = req.body.filtro
        const busqueda = {}
        const estadias = await Estadia.find(busqueda);
        for (const estadia of estadias) {
            if (estadia.documentos?.etapas[5]?.estado === "Aceptada" && estadia.avance?.revision?.estado === "true") {
                const idAlumno = estadia._doc.idAlumno;
                const busqueda = {
                    _id: new ObjectId(idAlumno)
                };
                const alumno = await Alumno.findOne(busqueda);
                if (alumno) {
                    const infoAlumno = {
                        idAlumno: idAlumno,
                        nombre: alumno.datosPersonales.nombres.nombre,
                        apPaterno: alumno.datosPersonales.nombres.apPaterno,
                        apMaterno: alumno.datosPersonales.nombres.apMaterno,
                        matricula: alumno.datosPersonales.privado.matricula,
                        nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                        carrera: alumno.datosAcademicos.carrera,
                        area: alumno.datosAcademicos.area
                    };
                    alumnos.push(infoAlumno);
                }
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }
        const data = alumnos;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Apellido paterno', key: 'apPaterno' },
            { header: 'Apellido materno', key: 'apMaterno' },
            { header: 'Matricula', key: 'matricula' },
            { header: 'Nivel academico', key: 'nivelAcademico' },
            { header: 'Carrera', key: 'carrera' },
            { header: 'Area', key: 'area' },
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos-liberados.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Busqueda de historial de alumnos
router.post('/alumnos/historial', async (req, res) => {
    try {
        let alumnos = [];
        const filtro = req.body.filtro;
        const busqueda = {}
        if (filtro.año) {
            busqueda["cartaPresentacion.datosAcademicos.año"] = filtro.año;
        }
        if (filtro.periodo) {
            busqueda["cartaPresentacion.datosAcademicos.periodo"] = filtro.periodo;
        }
        const estadias = await Estadia.find(busqueda);
        for (const estadia of estadias) {
            const idAlumno = estadia._doc.idAlumno;
            const busqueda = {
                _id: new ObjectId(idAlumno)
            };
            if (filtro.buscador) {
                const textoBusqueda = filtro.buscador;
                const regex = new RegExp(textoBusqueda, 'i');
                busqueda.$or = [
                    { 'datosPersonales.nombres.nombre': regex },
                    { 'datosPersonales.nombres.apPaterno': regex },
                    { 'datosPersonales.nombres.apMaterno': regex },
                    { 'datosPersonales.privado.matricula': regex },
                ];
                const numeroPartes = textoBusqueda.split(" ");
                if (numeroPartes.length >= 2) {
                    const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                    const apPaterno = numeroPartes[numeroPartes.length - 2];
                    const apMaterno = numeroPartes[numeroPartes.length - 1];
                    busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                    busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                    busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
                }
            }
            if (filtro.nivelAcademico) {
                busqueda["datosAcademicos.nivelAcademico"] = filtro.nivelAcademico;
            }
            if (filtro.carrera) {
                busqueda["datosAcademicos.carrera"] = filtro.carrera;
            }
            if (filtro.area) {
                busqueda["datosAcademicos.area"] = filtro.area;
            }
            if (filtro.grado) {
                busqueda["datosAcademicos.grado"] = filtro.grado;
            }
            if (filtro.grupo) {
                busqueda["datosAcademicos.grupo"] = filtro.grupo;
            }
            const alumno = await Alumno.findOne(busqueda);
            if (alumno) {
                const infoAlumno = {
                    idAlumno: idAlumno,
                    nombre: alumno.datosPersonales.nombres.nombre,
                    apPaterno: alumno.datosPersonales.nombres.apPaterno,
                    apMaterno: alumno.datosPersonales.nombres.apMaterno,
                    matricula: alumno.datosPersonales.privado.matricula,
                    nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                    carrera: alumno.datosAcademicos.carrera,
                    area: alumno.datosAcademicos.area
                };
                alumnos.push(infoAlumno);
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Generar Excel de historial de alumnos (filtrado)
router.post('/alumnos/historial/excel', async (req, res) => {
    try {
        let alumnos = [];
        const filtro = req.body.filtro;
        const busqueda = {}
        if (filtro.buscador) {
            return res.status(500).json({ message: "No se puede generar un archivo de Excel para un solo alumno." });
        }
        if (filtro.año) {
            busqueda["cartaPresentacion.datosAcademicos.año"] = filtro.año;
        }
        if (filtro.periodo) {
            busqueda["cartaPresentacion.datosAcademicos.periodo"] = filtro.periodo;
        }
        const estadias = await Estadia.find(busqueda);
        for (const estadia of estadias) {
            const idAlumno = estadia._doc.idAlumno;
            const busqueda = {
                _id: new ObjectId(idAlumno)
            };
            if (filtro.buscador) {
                const textoBusqueda = filtro.buscador;
                const regex = new RegExp(textoBusqueda, 'i');
                busqueda.$or = [
                    { 'datosPersonales.nombres.nombre': regex },
                    { 'datosPersonales.nombres.apPaterno': regex },
                    { 'datosPersonales.nombres.apMaterno': regex },
                    { 'datosPersonales.privado.matricula': regex },
                ];
                const numeroPartes = textoBusqueda.split(" ");
                if (numeroPartes.length >= 2) {
                    const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                    const apPaterno = numeroPartes[numeroPartes.length - 2];
                    const apMaterno = numeroPartes[numeroPartes.length - 1];
                    busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                    busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                    busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
                }
            }
            if (filtro.nivelAcademico) {
                busqueda["datosAcademicos.nivelAcademico"] = filtro.nivelAcademico;
            }
            if (filtro.carrera) {
                busqueda["datosAcademicos.carrera"] = filtro.carrera;
            }
            if (filtro.area) {
                busqueda["datosAcademicos.area"] = filtro.area;
            }
            if (filtro.grado) {
                busqueda["datosAcademicos.grado"] = filtro.grado;
            }
            if (filtro.grupo) {
                busqueda["datosAcademicos.grupo"] = filtro.grupo;
            }
            const alumno = await Alumno.findOne(busqueda);
            if (alumno) {
                const infoAlumno = {
                    idAlumno: idAlumno,
                    nombre: alumno.datosPersonales.nombres.nombre,
                    apPaterno: alumno.datosPersonales.nombres.apPaterno,
                    apMaterno: alumno.datosPersonales.nombres.apMaterno,
                    matricula: alumno.datosPersonales.privado.matricula,
                    nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                    carrera: alumno.datosAcademicos.carrera,
                    area: alumno.datosAcademicos.area
                };
                alumnos.push(infoAlumno);
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }

        const data = alumnos;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Apellido paterno', key: 'apPaterno' },
            { header: 'Apellido materno', key: 'apMaterno' },
            { header: 'Matricula', key: 'matricula' },
            { header: 'Nivel academico', key: 'nivelAcademico' },
            { header: 'Carrera', key: 'carrera' },
            { header: 'Area', key: 'area' },
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos-liberados.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Generar Excel de historial de alumnos (filtrado)
router.post('/alumnos/historial/excel-general', async (req, res) => {
    try {
        let alumnos = [];
        const busqueda = {}
        const estadias = await Estadia.find(busqueda);
        for (const estadia of estadias) {
            const idAlumno = estadia._doc.idAlumno;
            const busqueda = {
                _id: new ObjectId(idAlumno)
            };
            const alumno = await Alumno.findOne(busqueda);
            if (alumno) {
                const infoAlumno = {
                    idAlumno: idAlumno,
                    nombre: alumno.datosPersonales.nombres.nombre,
                    apPaterno: alumno.datosPersonales.nombres.apPaterno,
                    apMaterno: alumno.datosPersonales.nombres.apMaterno,
                    matricula: alumno.datosPersonales.privado.matricula,
                    nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                    carrera: alumno.datosAcademicos.carrera,
                    area: alumno.datosAcademicos.area
                };
                alumnos.push(infoAlumno);
            }
        }
        if (alumnos.length === 0 || alumnos === null) {
            return res.json("No se encontraron alumnos");
        }

        const data = alumnos;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Apellido paterno', key: 'apPaterno' },
            { header: 'Apellido materno', key: 'apMaterno' },
            { header: 'Matricula', key: 'matricula' },
            { header: 'Nivel academico', key: 'nivelAcademico' },
            { header: 'Carrera', key: 'carrera' },
            { header: 'Area', key: 'area' },
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos-liberados.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* Perfil Alumno */

// POST - Ver perfil alumno
router.post('/alumno/perfil', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const alumno = await Alumno.findById(idAlumno);
        const estadia = await Estadia.findOne({
            idAlumno: new ObjectId(idAlumno)
        })
        const infoAlumno = {
            idAlumno: idAlumno,
            nombre: alumno.datosPersonales.nombres.nombre,
            apPaterno: alumno.datosPersonales.nombres.apPaterno,
            apMaterno: alumno.datosPersonales.nombres.apMaterno,
            matricula: alumno.datosPersonales.privado.matricula,
            nivelAcademico: alumno.datosAcademicos.nivelAcademico,
            turno: alumno.datosAcademicos.turno,
            carrera: alumno.datosAcademicos.carrera,
            area: alumno.datosAcademicos.area,
            grado: alumno.datosAcademicos.grado,
            grupo: alumno.datosAcademicos.grupo,
        };
        if (estadia.cartaPresentacion) {
            infoAlumno.cartaPresentacion = estadia.cartaPresentacion
        }
        if (estadia.anteproyecto) {
            infoAlumno.anteproyecto = estadia.anteproyecto;
        }
        if (estadia.avance) {
            infoAlumno.avance = estadia.avance;
        }
        if (estadia.documentos) {
            infoAlumno.documentos = estadia.documentos;
        }
        res.json(infoAlumno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH - Modificar carta presentacion
router.patch('/alumno/perfil/cpa/modificar', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        const cpa = req.body.cpa;

        estadia.cartaPresentacion.estado.nombre = cpa.estado.nombre;
        estadia.cartaPresentacion.estado.motivo = cpa.estado.motivo;
        estadia.cartaPresentacion.estado.fecha = cpa.estado.fecha;

        const datosAlumno = cpa.datosAlumno;
        const nombres = datosAlumno.nombres;
        estadia.cartaPresentacion.datosAlumno.nombres.nombre = nombres.nombre;
        estadia.cartaPresentacion.datosAlumno.nombres.apPaterno = nombres.apPaterno;
        estadia.cartaPresentacion.datosAlumno.nombres.apMaterno = nombres.apMaterno;

        const privado = datosAlumno.privado;
        estadia.cartaPresentacion.datosAlumno.privado.matricula = privado.matricula;
        estadia.cartaPresentacion.datosAlumno.privado.email = privado.email;
        estadia.cartaPresentacion.datosAlumno.telefonoCelular = datosAlumno.telefonoCelular;
        estadia.cartaPresentacion.datosAlumno.telefonoCasa = datosAlumno.telefonoCasa;
        estadia.cartaPresentacion.datosAlumno.nss = datosAlumno.nss;
        estadia.cartaPresentacion.datosAlumno.curp = datosAlumno.curp;

        const datosAcademicos = cpa.datosAcademicos;
        const datosAcademicosAlumno = cpa.datosAcademicos.datosAcademicosAlumno;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.nivelAcademico = datosAcademicosAlumno.nivelAcademico;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.turno = datosAcademicosAlumno.turno;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.carrera = datosAcademicos.carrera;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.area = datosAcademicos.area;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grado = datosAcademicosAlumno.grado;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grupo = datosAcademicosAlumno.grupo;
        estadia.cartaPresentacion.datosAcademicos.periodo = datosAcademicos.periodo;
        estadia.cartaPresentacion.datosAcademicos.año = datosAcademicos.año;

        const datosEmpresa = cpa.datosEmpresa;
        estadia.cartaPresentacion.datosEmpresa.nombreEmpresa = datosEmpresa.nombreEmpresa;
        estadia.cartaPresentacion.datosEmpresa.nombreEmpresario = datosEmpresa.nombreEmpresario;
        estadia.cartaPresentacion.datosEmpresa.puestoEmpresario = datosEmpresa.puestoEmpresario;

        await Estadia.findByIdAndUpdate(estadia._id, estadia);
        res.json(estadia);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// POST - Generar PDF de carta de presentacion
router.post('/alumno/perfil/cpa/imprimir', async (req, res) => {
    try {
        const cartaData = req.body;
        const plantillaPath = `../documents/${cartaData.tipo}.docx`;

        // Leer la plantilla Word y cargarla en el zip
        const templatePath = path.join(__dirname, plantillaPath);
        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {});

        doc.setData(cartaData);
        doc.render();

        // Este es el word que quiero convertir a PDF
        const docx = doc.getZip().generate({ type: 'nodebuffer' });

        // Configurar el encabezado para indicar el tipo de archivo que se envía en la respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=carta_presentacion.docx');

        // Enviar el archivo DOCX como respuesta al cliente
        res.send(docx);

    } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Error al generar carta" });
    }
});

// POST - Eliminar carta presentacion
router.patch('/alumno/perfil/cpa/eliminar', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        if (estadia.cartaPresentacion) {
            estadia.cartaPresentacion = undefined;
            delete estadia.cartaPresentacion;
            await Estadia.findByIdAndUpdate(estadia._id, estadia);
            res.json("Eliminado correctamente");
        } else {
            res.json("No se encontro una carta presentacion")
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// PATCH - Modificar un anteproyecto
router.patch('/alumno/perfil/anteproyecto/modificar', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        const anteproyecto = req.body.anteproyecto;

        const datosEmpresa = anteproyecto.datosEmpresa;
        estadia.anteproyecto.datosEmpresa.emailEmpresario = datosEmpresa.emailEmpresario || estadia.anteproyecto.datosEmpresa.emailEmpresario;
        estadia.anteproyecto.datosEmpresa.telefonoEmpresario = datosEmpresa.telefonoEmpresario || estadia.anteproyecto.datosEmpresa.telefonoEmpresario;

        const datosProyecto = anteproyecto.datosProyecto;
        estadia.anteproyecto.datosProyecto.nombre = datosProyecto.nombre || estadia.anteproyecto.datosProyecto.nombre;
        estadia.anteproyecto.datosProyecto.objetivo = datosProyecto.objetivo || estadia.anteproyecto.datosProyecto.objetivo;
        estadia.anteproyecto.datosProyecto.descripcion = datosProyecto.descripcion || estadia.anteproyecto.datosProyecto.descripcion;

        estadia.anteproyecto.estado.nombre = anteproyecto.estado.nombre || estadia.anteproyecto.estado.nombre;
        estadia.anteproyecto.estado.motivo = anteproyecto.estado.motivo || estadia.anteproyecto.estado.motivo;
        estadia.anteproyecto.estado.fecha = anteproyecto.estado.fecha || estadia.anteproyecto.estado.fecha;

        estadia.anteproyecto.fechaRegistro = anteproyecto.fechaRegistro || estadia.anteproyecto.fechaRegistro;
        const updatedAnteproyecto = await estadia.save();
        res.json(updatedAnteproyecto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Ver/descargar documento
router.post('/alumno/perfil/documento/descargar', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const nombreDocumento = req.body.nombreDocumento;
        const pathDocumento = req.body.pathDocumento;

        const rutaCompleta = path.join(__dirname, '..', pathDocumento);

        if (!fs.existsSync(rutaCompleta)) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }

        const archivo = fs.createReadStream(rutaCompleta);
        res.setHeader('Content-Disposition', `attachment; filename=${nombreDocumento}`);
        res.setHeader('Content-Type', 'application/pdf');

        archivo.pipe(res);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Aceptar o rechazar avance
router.post('/alumno/perfil/avance/etapa-toggle', async (req, res) => {
    try {
        const etapa = req.body.etapa;
        const estado = req.body.estado;
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);
        estadia.avance[etapa].estado = estado;
        estadia.avance[etapa].fecha = new Date();

        await Estadia.findByIdAndUpdate(estadia._id, estadia);

        res.json({ etapa, estado, fecha: new Date() });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Aceptar o rechazar documentos
router.post('/alumno/perfil/documentos/etapa-toggle', async (req, res) => {
    try {
        const etapa = req.body.etapa;
        const estado = req.body.estado;
        const motivo = req.body.motivo;
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);
        estadia.documentos.etapas[etapa].estado = estado;
        estadia.documentos.etapas[etapa].motivo = motivo;
        estadia.documentos.etapas[etapa].fecha = new Date();

        await Estadia.findByIdAndUpdate(estadia._id, estadia);

        res.json({ etapa, estado, motivo, fecha: new Date() });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/* Asesores */

// POST - Busqueda de todos los asesores
router.post('/asesores', async (req, res) => {
    try {
        const filtro = req.body.filtro;
        const busqueda = {};
        if (filtro.buscador) {
            const textoBusqueda = filtro.buscador;
            const regex = new RegExp(textoBusqueda, 'i');
            busqueda.$or = [
                { 'datosPersonales.nombres.nombre': regex },
                { 'datosPersonales.nombres.apPaterno': regex },
                { 'datosPersonales.nombres.apMaterno': regex }
            ];
            const numeroPartes = textoBusqueda.split(" ");
            if (numeroPartes.length >= 2) {
                const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                const apPaterno = numeroPartes[numeroPartes.length - 2];
                const apMaterno = numeroPartes[numeroPartes.length - 1];
                busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
            }
        }
        if (filtro.carrera) {
            busqueda["datosAcademicos.carrera"] = filtro.carrera;
        }
        if (filtro.area) {
            busqueda["datosAcademicos.area"] = filtro.area;
        }
        const asesores = await Asesor.find(busqueda);
        let arrAsesores = [];
        for (const asesor of asesores) {
            const infoAsesor = {
                idAsesor: asesor._id,
                nombre: asesor.datosPersonales.nombres.nombre,
                apPaterno: asesor.datosPersonales.nombres.apPaterno,
                apMaterno: asesor.datosPersonales.nombres.apMaterno,
                carrera: asesor.datosAcademicos.carrera,
                email: asesor.datosPersonales.privado.email,
                password: asesor.datosPersonales.privado.password,
                username: asesor.datosPersonales.privado.username,
                estado: asesor.estado
            }
            arrAsesores.push(infoAsesor);
        }
        res.json(arrAsesores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Busqueda de todos los asesores
router.post('/asesores/excel', async (req, res) => {
    try {
        const filtro = req.body.filtro;
        const busqueda = {};
        if (filtro.buscador) {
            const textoBusqueda = filtro.buscador;
            const regex = new RegExp(textoBusqueda, 'i');
            busqueda.$or = [
                { 'datosPersonales.nombres.nombre': regex },
                { 'datosPersonales.nombres.apPaterno': regex },
                { 'datosPersonales.nombres.apMaterno': regex }
            ];
            const numeroPartes = textoBusqueda.split(" ");
            if (numeroPartes.length >= 2) {
                const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                const apPaterno = numeroPartes[numeroPartes.length - 2];
                const apMaterno = numeroPartes[numeroPartes.length - 1];
                busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
            }
        }
        if (filtro.carrera) {
            busqueda["datosAcademicos.carrera"] = filtro.carrera;
        }
        if (filtro.area) {
            busqueda["datosAcademicos.area"] = filtro.area;
        }
        const asesores = await Asesor.find(busqueda);
        let arrAsesores = [];
        for (const asesor of asesores) {
            const infoAsesor = {
                idAsesor: asesor._id,
                nombre: asesor.datosPersonales.nombres.nombre,
                apPaterno: asesor.datosPersonales.nombres.apPaterno,
                apMaterno: asesor.datosPersonales.nombres.apMaterno,
                carrera: asesor.datosAcademicos.carrera,
                email: asesor.datosPersonales.privado.email,
                password: asesor.datosPersonales.privado.password,
                username: asesor.datosPersonales.privado.username,
                estado: asesor.estado
            }
            arrAsesores.push(infoAsesor);
        }

        const data = arrAsesores;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Apellido paterno', key: 'apPaterno' },
            { header: 'Apellido materno', key: 'apMaterno' },
            { header: 'Carrera', key: 'carrera' },
            { header: 'Estado', key: 'estado' }
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos-liberados.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Crear nuevo asesor
router.post('/asesores/crear', async (req, res) => {
    try {
        const password = req.body.asesor.datosPersonales.privado.password;

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                throw new Error('Error al generar el hash de la contraseña');
            }

            const asesor = new Asesor({
                estado: req.body.asesor.estado,
                datosPersonales: {
                    nombres: {
                        nombre: req.body.asesor.datosPersonales.nombres.nombre,
                        apPaterno: req.body.asesor.datosPersonales.nombres.apPaterno,
                        apMaterno: req.body.asesor.datosPersonales.nombres.apMaterno
                    },
                    privado: {
                        email: req.body.asesor.datosPersonales.privado.email,
                        telefono: req.body.asesor.datosPersonales.privado.telefono,
                        username: req.body.asesor.datosPersonales.privado.username,
                        password: hash
                    }
                },
                datosAcademicos: {
                    carrera: req.body.asesor.datosAcademicos.carrera
                },
                fechaRegistro: new Date(req.body.asesor.fechaRegistro)
            });

            const newAsesor = await asesor.save();
            res.status(201).json(newAsesor);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Perfil de asesor (informacion general)
router.post('/asesor/perfil', async (req, res) => {
    try {
        const idAsesor = req.body.asesor;
        const asesor = await Asesor.findById(idAsesor);
        res.json(asesor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/asesor/perfil/modificar', async (req, res) => {
    try {
        const idAsesor = req.body.asesor.idAsesor;
        const asesor = await Asesor.findById(idAsesor);

        const newPassword = req.body.asesor.datosPersonales.privado.password;
        const currentPassword = asesor.datosPersonales.privado.password;

        if (newPassword && newPassword !== currentPassword) {
            bcrypt.hash(newPassword, 10, async (err, hash) => {
                if (err) {
                    throw new Error('Error al generar el hash de la contraseña');
                }
                asesor.datosPersonales.privado.password = hash;
                await saveAsesor(asesor, res, req.body);
            });
        } else {
            await saveAsesor(asesor, res, req.body);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

async function saveAsesor(asesor, res, body) {
    try {
        asesor.estado = body.asesor.estado || asesor.estado;

        asesor.datosPersonales.nombres.nombre = body.asesor.datosPersonales.nombres.nombre || asesor.datosPersonales.nombres.nombre;
        asesor.datosPersonales.nombres.apPaterno = body.asesor.datosPersonales.nombres.apPaterno || asesor.datosPersonales.nombres.apPaterno;
        asesor.datosPersonales.nombres.apMaterno = body.asesor.datosPersonales.nombres.apMaterno || asesor.datosPersonales.nombres.apMaterno;

        asesor.datosPersonales.privado.email = body.asesor.datosPersonales.privado.email || asesor.datosPersonales.privado.email;
        asesor.datosPersonales.privado.telefono = body.asesor.datosPersonales.privado.telefono || asesor.datosPersonales.privado.telefono;
        asesor.datosPersonales.privado.username = body.asesor.datosPersonales.privado.username || asesor.datosPersonales.privado.username;

        asesor.datosAcademicos.carrera = body.asesor.datosAcademicos.carrera || asesor.datosAcademicos.carrera;

        const newAsesor = await asesor.save();
        res.status(201).json(newAsesor);
    } catch (error) {
        throw new Error('Error al guardar el asesor');
    }
}

// DELETE - Borrar asesor
router.post('/asesor/perfil/borrar', async (req, res) => {
    try {
        const idAsesor = req.body.asesor;
        const asesor = await Asesor.findByIdAndDelete(idAsesor);
        if (asesor) {
            return res.status(202).json("Asesor eliminado correctamente");
        }
        res.status(204).json();
    } catch (error) {
        res.status(204).json({ message: error.message });
    }
});

// POST - Perfil asesor, alumnos asesorados
router.post('/asesor/perfil/alumnos', async (req, res) => {
    try {
        const idAsesor = req.body.idAsesor;
        let alumnos = [];
        const estadias = await Estadia.find({
            idAsesor: new ObjectId(idAsesor)
        }).sort({ "cartaPresentacion.fechaRegistro": -1 });
        for (const estadia of estadias) {
            if (estadia.documentos?.etapas[5]?.estado !== "Aceptada" && estadia.avance?.revision?.estado !== "true") {
                const idAlumno = estadia._doc.idAlumno;
                const busqueda = {
                    _id: new ObjectId(idAlumno)
                };
                const alumno = await Alumno.findOne(busqueda);
                if (alumno) {
                    const infoAlumno = {
                        idAlumno: idAlumno,
                        nombre: alumno.datosPersonales.nombres.nombre,
                        apPaterno: alumno.datosPersonales.nombres.apPaterno,
                        apMaterno: alumno.datosPersonales.nombres.apMaterno,
                        matricula: alumno.datosPersonales.privado.matricula,
                        nivelAcademico: alumno.datosAcademicos.nivelAcademico,
                        carrera: alumno.datosAcademicos.carrera,
                        area: alumno.datosAcademicos.area
                    };
                    alumnos.push(infoAlumno);
                }
            }
        }
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* Administrador */

// POST - Busqueda de todos los administradores
router.post('/administradores', async (req, res) => {
    try {
        const filtro = req.body.filtro;
        const busqueda = {};
        if (filtro.buscador) {
            const textoBusqueda = filtro.buscador;
            const regex = new RegExp(textoBusqueda, 'i');
            busqueda.$or = [
                { 'datosPersonales.nombres.nombre': regex },
                { 'datosPersonales.nombres.apPaterno': regex },
                { 'datosPersonales.nombres.apMaterno': regex }
            ];
            const numeroPartes = textoBusqueda.split(" ");
            if (numeroPartes.length >= 2) {
                const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                const apPaterno = numeroPartes[numeroPartes.length - 2];
                const apMaterno = numeroPartes[numeroPartes.length - 1];
                busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
            }
        }
        const administradores = await Administrador.find(busqueda);
        let arrAdministradores = [];
        for (const administrador of administradores) {
            const infoAdmin = {
                idAdministrador: administrador._id,
                nombre: administrador.datosPersonales.nombres.nombre,
                apPaterno: administrador.datosPersonales.nombres.apPaterno,
                apMaterno: administrador.datosPersonales.nombres.apMaterno,
                email: administrador.datosPersonales.privado.email,
                password: administrador.datosPersonales.privado.password,
                username: administrador.datosPersonales.privado.username,
            }
            arrAdministradores.push(infoAdmin);
        }
        res.json(arrAdministradores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Busqueda de todos los administradores
router.post('/administradores/excel', async (req, res) => {
    try {
        const filtro = req.body.filtro;
        const busqueda = {};
        if (filtro.buscador) {
            const textoBusqueda = filtro.buscador;
            const regex = new RegExp(textoBusqueda, 'i');
            busqueda.$or = [
                { 'datosPersonales.nombres.nombre': regex },
                { 'datosPersonales.nombres.apPaterno': regex },
                { 'datosPersonales.nombres.apMaterno': regex }
            ];
            const numeroPartes = textoBusqueda.split(" ");
            if (numeroPartes.length >= 2) {
                const nombre = numeroPartes.slice(0, numeroPartes.length - 2).join(" ");
                const apPaterno = numeroPartes[numeroPartes.length - 2];
                const apMaterno = numeroPartes[numeroPartes.length - 1];
                busqueda.$or.push({ 'datosPersonales.nombres.nombre': nombre });
                busqueda.$or.push({ 'datosPersonales.nombres.apPaterno': apPaterno });
                busqueda.$or.push({ 'datosPersonales.nombres.apMaterno': apMaterno });
            }
        }
        const administradores = await Administrador.find(busqueda);
        let arrAdministradores = [];
        for (const administrador of administradores) {
            const infoAdmin = {
                idAdministrador: administrador._id,
                nombre: administrador.datosPersonales.nombres.nombre,
                apPaterno: administrador.datosPersonales.nombres.apPaterno,
                apMaterno: administrador.datosPersonales.nombres.apMaterno,
                email: administrador.datosPersonales.privado.email,
                password: administrador.datosPersonales.privado.password,
                username: administrador.datosPersonales.privado.username,
            }
            arrAdministradores.push(infoAdmin);
        }

        const data = arrAdministradores;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre' },
            { header: 'Apellido paterno', key: 'apPaterno' },
            { header: 'Apellido materno', key: 'apMaterno' },
            { header: 'Correo', key: 'email' },
            { header: 'Usuario', key: 'username' }
        ];

        data.forEach((row) => {
            worksheet.addRow(row);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos-liberados.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// POST - Crear nuevo administrador
router.post('/administrador/crear', async (req, res) => {
    try {
        const password = req.body.administrador.datosPersonales.privado.password;

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                throw new Error('Error al generar el hash de la contraseña');
            }
            const administrador = new Administrador({
                datosPersonales: {
                    nombres: {
                        nombre: req.body.administrador.datosPersonales.nombres.nombre,
                        apPaterno: req.body.administrador.datosPersonales.nombres.apPaterno,
                        apMaterno: req.body.administrador.datosPersonales.nombres.apMaterno
                    },
                    privado: {
                        email: req.body.administrador.datosPersonales.privado.email,
                        username: req.body.administrador.datosPersonales.privado.username,
                        password: hash
                    }
                },
                fechaRegistro: new Date(req.body.administrador.fechaRegistro)
            });
            const newAdministrador = await administrador.save();
            res.status(201).json(newAdministrador);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Perfil de administrador (informacion general)
router.post('/administrador/perfil', async (req, res) => {
    try {
        const idAdministrador = req.body.administrador;
        const administrador = await Administrador.findById(idAdministrador);
        res.json(administrador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/administrador/perfil/modificar', async (req, res) => {
    try {
        const idAdministrador = req.body.administrador.idAdministrador;
        const administrador = await Administrador.findById(idAdministrador);

        const newPassword = req.body.administrador.datosPersonales.privado.password;
        const currentPassword = administrador.datosPersonales.privado.password;

        if (newPassword && newPassword !== currentPassword) {
            bcrypt.hash(newPassword, 10, async (err, hash) => {
                if (err) {
                    throw new Error('Error al generar el hash de la contraseña');
                }
                administrador.datosPersonales.privado.password = hash;
                await saveAdministrador(administrador, res, req.body);
            });
        } else {
            await saveAdministrador(administrador, res, req.body);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

async function saveAdministrador(administrador, res, body) {
    try {
        administrador.estado = body.administrador.estado || administrador.estado;

        administrador.datosPersonales.nombres.nombre = body.administrador.datosPersonales.nombres.nombre || administrador.datosPersonales.nombres.nombre;
        administrador.datosPersonales.nombres.apPaterno = body.administrador.datosPersonales.nombres.apPaterno || administrador.datosPersonales.nombres.apPaterno;
        administrador.datosPersonales.nombres.apMaterno = body.administrador.datosPersonales.nombres.apMaterno || administrador.datosPersonales.nombres.apMaterno;

        administrador.datosPersonales.privado.email = body.administrador.datosPersonales.privado.email || administrador.datosPersonales.privado.email;
        administrador.datosPersonales.privado.username = body.administrador.datosPersonales.privado.username || administrador.datosPersonales.privado.username;

        const newAdministrador = await administrador.save();
        res.status(201).json(newAdministrador);
    } catch (error) {
        throw new Error('Error al guardar el asesor');
    }
}

// DELETE - Borrar administrador
router.post('/administrador/perfil/borrar', async (req, res) => {
    try {
        const idAdministrador = req.body.administrador;
        const administrador = await Administrador.findByIdAndDelete(idAdministrador);
        if (administrador) {
            return res.status(202).json("Administrador eliminado correctamente");
        }
        res.status(204).json();
    } catch (error) {
        res.status(204).json({ message: error.message });
    }
});

module.exports = router;