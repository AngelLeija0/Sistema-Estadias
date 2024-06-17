const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const Estadia = require('../models/estadia');
const Asesor = require('../models/asesor');
const Administracion = require('../models/administracion');
const Alumno = require('../models/alumno');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { idAlumno, apellidoPaterno, apellidoMaterno, nombre } = req.body;
        const alumnoFolderName = `${apellidoPaterno}_${apellidoMaterno}_${nombre}_${idAlumno}`;
        const alumnoFolderPath = path.resolve(__dirname, '..', 'documents', alumnoFolderName);
        if (!fs.existsSync(alumnoFolderPath)) {
            fs.mkdirSync(alumnoFolderPath);
        }
        cb(null, alumnoFolderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


// POST - Obtener toda la informacion de un alumno por id
router.post('/id', async (req, res) => {
    try {
        const idAlumno = req.body.id
        console.log({idAlumno})

        // Validación del ID
        if (!mongoose.Types.ObjectId.isValid(idAlumno)) {
            return res.status(400).json({ message: 'ID de alumno no válido' });
        }

        const alumno = await Alumno.findById(idAlumno);
        res.json(alumno);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

/* Carta Presentacion */

// POST - Ver informacion y estado de la carta presentacion
router.post('/cpa', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        if (!estadia) return res.json("No se encontro ninguna carta presentacion");
        if (estadia.cartaPresentacion !== null && estadia.cartaPresentacion !== undefined) {
            const infoCPA = {
                estado: {
                    nombre: estadia.cartaPresentacion.estado.nombre,
                    motivo: estadia.cartaPresentacion.estado.motivo,
                    fecha: estadia.cartaPresentacion.estado.fecha
                },
                datosAlumno: {
                    nombres: {
                        nombre: estadia.cartaPresentacion.datosAlumno.nombres.nombre,
                        apPaterno: estadia.cartaPresentacion.datosAlumno.nombres.apPaterno,
                        apMaterno: estadia.cartaPresentacion.datosAlumno.nombres.apMaterno
                    },
                    privado: {
                        matricula: estadia.cartaPresentacion.datosAlumno.privado.matricula,
                        email: estadia.cartaPresentacion.datosAlumno.privado.email
                    },
                    telefonoCelular: estadia.cartaPresentacion.datosAlumno.telefonoCelular,
                    telefonoCasa: estadia.cartaPresentacion.datosAlumno.telefonoCasa,
                    nss: estadia.cartaPresentacion.datosAlumno.nss,
                    curp: estadia.cartaPresentacion.datosAlumno.curp
                },
                datosAcademicos: {
                    datosAcademicosAlumno: {
                        nivelAcademico: estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.nivelAcademico,
                        turno: estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.turno,
                        carrera: estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.carrera,
                        area: estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.area,
                        grado: estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grupo,
                        grupo: estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grado
                    },
                    periodo: estadia.cartaPresentacion.datosAcademicos.periodo,
                    año: estadia.cartaPresentacion.datosAcademicos.año
                },
                datosEmpresa: {
                    nombreEmpresa: estadia.cartaPresentacion.datosEmpresa.nombreEmpresa,
                    nombreEmpresario: estadia.cartaPresentacion.datosEmpresa.nombreEmpresario,
                    puestoEmpresario: estadia.cartaPresentacion.datosEmpresa.puestoEmpresario
                },
                fechaRegistro: estadia.cartaPresentacion.fechaRegistro
            };
            return res.json(infoCPA);
        }
        res.json("No se encontro ninguna carta presentacion");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Crear una nueva carta presentacion
router.post('/cpa/crear', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        const cpa = {
            estado: {
                nombre: req.body.cartaPresentacion.estado.nombre,
                motivo: req.body.cartaPresentacion.estado.motivo,
                fecha: new Date(req.body.cartaPresentacion.estado.fecha)
            },
            datosAlumno: {
                nombres: {
                    nombre: req.body.cartaPresentacion.datosAlumno.nombres.nombre,
                    apPaterno: req.body.cartaPresentacion.datosAlumno.nombres.apPaterno,
                    apMaterno: req.body.cartaPresentacion.datosAlumno.nombres.apMaterno
                },
                privado: {
                    matricula: req.body.cartaPresentacion.datosAlumno.privado.matricula,
                    email: req.body.cartaPresentacion.datosAlumno.privado.email
                },
                telefonoCelular: req.body.cartaPresentacion.datosAlumno.telefonoCelular,
                telefonoCasa: req.body.cartaPresentacion.datosAlumno.telefonoCasa,
                nss: req.body.cartaPresentacion.datosAlumno.nss,
                curp: req.body.cartaPresentacion.datosAlumno.curp
            },
            datosAcademicos: {
                datosAcademicosAlumno: {
                    nivelAcademico: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.nivelAcademico,
                    turno: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.turno,
                    carrera: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.carrera,
                    area: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.area,
                    grado: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grado,
                    grupo: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grupo
                },
                periodo: req.body.cartaPresentacion.datosAcademicos.periodo,
                año: req.body.cartaPresentacion.datosAcademicos.año
            },
            datosEmpresa: {
                nombreEmpresa: req.body.cartaPresentacion.datosEmpresa.nombreEmpresa,
                nombreEmpresario: req.body.cartaPresentacion.datosEmpresa.nombreEmpresario,
                puestoEmpresario: req.body.cartaPresentacion.datosEmpresa.puestoEmpresario
            },
            fechaRegistro: new Date(req.body.cartaPresentacion.fechaRegistro)
        }
        estadia.cartaPresentacion = cpa;
        
        estadia.avance = {
            "anteproyecto": {
                "estado": "false",
                "fecha": new Date(),
            },
            "25%": {
                "estado": "false",
                "fecha": new Date(),
            },
            "50%": {
                "estado": "false",
                "fecha": new Date(),
            },
            "75%": {
                "estado": "false",
                "fecha": new Date(),
            },
            "100%": {
                "estado": "false",
                "fecha": new Date(),
            },
            "revision": {
                "estado": "false",
                "fecha": new Date(),
            }
        }
        
        const updatedEstadia = estadia.save();
        res.status(201).json(updatedEstadia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Guardar datos para carta presentacion
router.post('/cpa/guardar', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        const cpa = {
            estado: {
                nombre: req.body.cartaPresentacion.estado.nombre,
                motivo: req.body.cartaPresentacion.estado.motivo,
                fecha: new Date(req.body.cartaPresentacion.estado.fecha)
            },
            datosAlumno: {
                nombres: {
                    nombre: req.body.cartaPresentacion.datosAlumno.nombres.nombre,
                    apPaterno: req.body.cartaPresentacion.datosAlumno.nombres.apPaterno,
                    apMaterno: req.body.cartaPresentacion.datosAlumno.nombres.apMaterno
                },
                privado: {
                    matricula: req.body.cartaPresentacion.datosAlumno.privado.matricula,
                    email: req.body.cartaPresentacion.datosAlumno.privado.email
                },
                telefonoCelular: req.body.cartaPresentacion.datosAlumno.telefonoCelular,
                telefonoCasa: req.body.cartaPresentacion.datosAlumno.telefonoCasa,
                nss: req.body.cartaPresentacion.datosAlumno.nss,
                curp: req.body.cartaPresentacion.datosAlumno.curp
            },
            datosAcademicos: {
                datosAcademicosAlumno: {
                    nivelAcademico: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.nivelAcademico,
                    turno: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.turno,
                    carrera: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.carrera,
                    area: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.area,
                    grado: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grado,
                    grupo: req.body.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grupo
                },
                periodo: req.body.cartaPresentacion.datosAcademicos.periodo,
                año: req.body.cartaPresentacion.datosAcademicos.año
            },
            datosEmpresa: {
                nombreEmpresa: req.body.cartaPresentacion.datosEmpresa.nombreEmpresa,
                nombreEmpresario: req.body.cartaPresentacion.datosEmpresa.nombreEmpresario,
                puestoEmpresario: req.body.cartaPresentacion.datosEmpresa.puestoEmpresario
            },
            fechaRegistro: new Date(req.body.cartaPresentacion.fechaRegistro)
        }

        estadia.cartaPresentacion = cpa;
        const updatedEstadia = estadia.save();
        res.status(201).json(updatedEstadia);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH - Modificar carta presentacion
router.patch('/cpa/modificar', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        const cpa = req.body.cartaPresentacion;

        estadia.cartaPresentacion.estado.nombre = cpa.estado.nombre || estadia.cartaPresentacion.estado.nombre;
        estadia.cartaPresentacion.estado.motivo = cpa.estado.motivo || estadia.cartaPresentacion.estado.motivo;
        estadia.cartaPresentacion.estado.fecha = cpa.estado.fecha || estadia.cartaPresentacion.estado.fecha;

        const datosAlumno = cpa.datosAlumno;
        const nombres = datosAlumno.nombres;
        estadia.cartaPresentacion.datosAlumno.nombres.nombre = nombres.nombre || "";
        estadia.cartaPresentacion.datosAlumno.nombres.apPaterno = nombres.apPaterno || "";
        estadia.cartaPresentacion.datosAlumno.nombres.apMaterno = nombres.apMaterno || "";

        const privado = datosAlumno.privado;
        estadia.cartaPresentacion.datosAlumno.privado.matricula = privado.matricula || estadia.cartaPresentacion.datosAlumno.privado.matricula;
        estadia.cartaPresentacion.datosAlumno.privado.email = privado.email || estadia.cartaPresentacion.datosAlumno.privado.email;
        estadia.cartaPresentacion.datosAlumno.telefonoCelular = datosAlumno.telefonoCelular || estadia.cartaPresentacion.datosAlumno.telefonoCelular;
        estadia.cartaPresentacion.datosAlumno.telefonoCasa = datosAlumno.telefonoCasa || estadia.cartaPresentacion.datosAlumno.telefonoCasa;
        estadia.cartaPresentacion.datosAlumno.nss = datosAlumno.nss || estadia.cartaPresentacion.datosAlumno.nss;
        estadia.cartaPresentacion.datosAlumno.curp = datosAlumno.curp || estadia.cartaPresentacion.datosAlumno.curp;

        const datosAcademicos = cpa.datosAcademicos;
        const datosAcademicosAlumno = datosAcademicos.datosAcademicosAlumno;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.nivelAcademico = datosAcademicosAlumno.nivelAcademico || estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.nivelAcademico;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.turno = datosAcademicosAlumno.turno || estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.turno;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.carrera = datosAcademicos.carrera || estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.carrera;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.area = datosAcademicos.area || estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.area;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grado = datosAcademicosAlumno.grado || estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grado;
        estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grupo = datosAcademicosAlumno.grupo || estadia.cartaPresentacion.datosAcademicos.datosAcademicosAlumno.grupo;
        estadia.cartaPresentacion.datosAcademicos.periodo = datosAcademicos.periodo || estadia.cartaPresentacion.datosAcademicos.periodo;
        estadia.cartaPresentacion.datosAcademicos.año = datosAcademicos.año || estadia.cartaPresentacion.datosAcademicos.año;

        const datosEmpresa = cpa.datosEmpresa;
        estadia.cartaPresentacion.datosEmpresa.nombreEmpresa = datosEmpresa.nombreEmpresa || estadia.cartaPresentacion.datosEmpresa.nombreEmpresa;
        estadia.cartaPresentacion.datosEmpresa.nombreEmpresario = datosEmpresa.nombreEmpresario || estadia.cartaPresentacion.datosEmpresa.nombreEmpresario;
        estadia.cartaPresentacion.datosEmpresa.puestoEmpresario = datosEmpresa.puestoEmpresario || estadia.cartaPresentacion.datosEmpresa.puestoEmpresario;

        await Estadia.findByIdAndUpdate(estadia._id, estadia);
        res.json(estadia.cartaPresentacion);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

/* Seguimiento Administrativo */

// POST - Buscar disponibilidad de etapas
router.get('/etapas', async (req, res) => {
    try {
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

// POST - Subir documentos y/o actualizar documentos
router.post('/documentos/subir', upload.array('archivos'), async (req, res) => {
    try {
        const { idAlumno, apellidoPaterno, apellidoMaterno, nombre } = req.body;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);
        if (!estadia.documentos) {
            estadia.documentos = {};
        }

        const alumnoFolderName = `${apellidoPaterno}_${apellidoMaterno}_${nombre}_${idAlumno}`;

        for (const archivo of req.files) {
            let objKey = archivo.filename;
            archivo.filename === "CurriculumVitaeEspanol.pdf" ? objKey = "curriculumEspanol" : '';
            archivo.filename === "CurriculumVitaeIngles.pdf" ? objKey = "curriculumIngles" : '';
            archivo.filename === "Segurofacultativo.pdf" ? objKey = "nss" : '';
            archivo.filename === "Cartapresentacion.pdf" ? objKey = "cpa" : '';
            archivo.filename === "Cartaaceptacion.pdf" ? objKey = "caa" : '';
            archivo.filename === "Reporteproyecto.pdf" ? objKey = "reporte" : '';
            archivo.filename === "Rubrica.pdf" ? objKey = "rubrica" : '';
            archivo.filename === "Dictamen.pdf" ? objKey = "dictamen" : '';
            archivo.filename === "Protesta.pdf" ? objKey = "protesta" : '';
            archivo.filename === "Terminacion.pdf" ? objKey = "cta" : '';
            const pathFile = path.join('documents', alumnoFolderName, archivo.filename);

            if (estadia.documentos[objKey]) {
                estadia.documentos[objKey].archivo = pathFile;
                estadia.documentos[objKey].estado = "En revision"
                estadia.documentos[objKey].fecha = new Date();
            } else {
                estadia.documentos[objKey] = {
                    archivo: pathFile,
                    estado: "En revision",
                    fecha: new Date(),
                };
            }
        }
        await Estadia.findByIdAndUpdate(estadia._id, estadia);
        res.status(200).json(estadia.documentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Ver estado de documentos
router.post('/documentos', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);
        const documentos = estadia.documentos;
        if (documentos === null || documentos === undefined) {
            res.status(204).json("No se encontraron documentos");
        } else {
            res.json(documentos);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/* Seguimiento Academico  */

// POST - Ver informacion y estado de anteprocto
router.post('/academico/anteproyecto', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);
        const anteproyecto = estadia.anteproyecto;

        if (anteproyecto !== null && anteproyecto !== undefined) {
            const infoAnteproyecto = {
                datosAsesorAcademico: {
                    nombre: anteproyecto.datosAsesorAcademico.nombre,
                    email: anteproyecto.datosAsesorAcademico.email,
                    telefono: anteproyecto.datosAsesorAcademico.telefono
                },
                datosAsesorEmpresarial: {
                    nombre: anteproyecto.datosAsesorEmpresarial.nombre,
                    email: anteproyecto.datosAsesorEmpresarial.email,
                    telefono: anteproyecto.datosAsesorEmpresarial.telefono
                },
                datosProyecto: {
                    nombre: anteproyecto.datosProyecto.nombre,
                    objetivo: anteproyecto.datosProyecto.objetivo,
                    descripcion: anteproyecto.datosProyecto.descripcion
                },
                estado: {
                    nombre: anteproyecto.estado.nombre,
                    motivo: anteproyecto.estado.motivo,
                    fecha: anteproyecto.estado.fecha
                },
                fechaRegistro: anteproyecto.fechaRegistro
            }
            res.json(infoAnteproyecto);
        } else {
            res.json("No se encontro ningun anteproyecto")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Buscar asesores
router.post('/academico/anteproyecto/asesores', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const alumno = await Alumno.findById(idAlumno);
        const carrera = alumno.datosAcademicos.carrera;
        const asesores = await Asesor.find({
            "datosAcademicos.carrera": carrera,
            "estado": "Activo",
        });
        res.json(asesores);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Crear un anteproyecto
router.post('/academico/anteproyecto/crear', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const idAsesor = req.body.idAsesor;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        estadia.idAsesor = new ObjectId(idAsesor);

        estadia.anteproyecto = {
            datosAsesorAcademico: {
                nombre: req.body.anteproyecto.datosAsesorAcademico.nombre,
                email: req.body.anteproyecto.datosAsesorAcademico.email,
                telefono: req.body.anteproyecto.datosAsesorAcademico.telefono
            },
            datosAsesorEmpresarial: {
                nombre: req.body.anteproyecto.datosAsesorEmpresarial.nombre,
                email: req.body.anteproyecto.datosAsesorEmpresarial.email,
                telefono: req.body.anteproyecto.datosAsesorEmpresarial.telefono
            },
            datosProyecto: {
                nombre: req.body.anteproyecto.datosProyecto.nombre,
                objetivo: req.body.anteproyecto.datosProyecto.objetivo,
                descripcion: req.body.anteproyecto.datosProyecto.descripcion
            },
            estado: {
                nombre: req.body.anteproyecto.estado.nombre,
                motivo: req.body.anteproyecto.estado.motivo,
                fecha: req.body.anteproyecto.estado.fecha
            },
            fechaRegistro: req.body.anteproyecto.fechaRegistro
        }

        estadia.avance = {
            "anteproyecto": {
                "estado": "false",
                "fecha": new Date(),
            },
            "25%": {
                "estado": "false",
                "fecha": new Date(),
            },
            "50%": {
                "estado": "false",
                "fecha": new Date(),
            },
            "75%": {
                "estado": "false",
                "fecha": new Date(),
            },
            "100%": {
                "estado": "false",
                "fecha": new Date(),
            },
            "revision": {
                "estado": "false",
                "fecha": new Date(),
            }
        }

        const newAnteproyecto = await estadia.save();
        res.status(201).json(newAnteproyecto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Guardar anteproyecto
router.post('/academico/anteproyecto/guardar', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const idAsesor = req.body.idAsesor;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        estadia.idAsesor = new ObjectId(idAsesor);

        estadia.anteproyecto = {
            datosAsesorAcademico: {
                nombre: req.body.anteproyecto.datosAsesorAcademico.nombre,
                email: req.body.anteproyecto.datosAsesorAcademico.email,
                telefono: req.body.anteproyecto.datosAsesorAcademico.telefono
            },
            datosAsesorEmpresarial: {
                nombre: req.body.anteproyecto.datosAsesorEmpresarial.nombre,
                email: req.body.anteproyecto.datosAsesorEmpresarial.email,
                telefono: req.body.anteproyecto.datosAsesorEmpresarial.telefono
            },
            datosProyecto: {
                nombre: req.body.anteproyecto.datosProyecto.nombre,
                objetivo: req.body.anteproyecto.datosProyecto.objetivo,
                descripcion: req.body.anteproyecto.datosProyecto.descripcion
            },
            estado: {
                nombre: req.body.anteproyecto.estado.nombre,
                motivo: req.body.anteproyecto.estado.motivo,
                fecha: req.body.anteproyecto.estado.fecha
            },
            fechaRegistro: req.body.anteproyecto.fechaRegistro
        }

        if (!estadia.avance){
            estadia.avance = {
                "anteproyecto": {
                    "estado": "false",
                    "fecha": new Date(),
                },
                "25%": {
                    "estado": "false",
                    "fecha": new Date(),
                },
                "50%": {
                    "estado": "false",
                    "fecha": new Date(),
                },
                "75%": {
                    "estado": "false",
                    "fecha": new Date(),
                },
                "100%": {
                    "estado": "false",
                    "fecha": new Date(),
                },
                "revision": {
                    "estado": "false",
                    "fecha": new Date(),
                }
            }
        }
        
        const newAnteproyecto = await estadia.save();
        res.status(201).json(newAnteproyecto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH - Modificar un anteproyecto
router.patch('/academico/anteproyecto/modificar', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const idAsesor = req.body.idAsesor;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);

        estadia.idAsesor = new ObjectId(idAsesor);

        const anteproyecto = req.body.anteproyecto;

        const datosAsesorAcademico = anteproyecto.datosAsesorAcademico;
        estadia.anteproyecto.datosAsesorAcademico.nombre = datosAsesorAcademico.nombre;
        estadia.anteproyecto.datosAsesorAcademico.email = datosAsesorAcademico.email;
        estadia.anteproyecto.datosAsesorAcademico.telefono = datosAsesorAcademico.telefono;

        const datosAsesorEmpresarial = anteproyecto.datosAsesorEmpresarial;
        estadia.anteproyecto.datosAsesorEmpresarial.nombre = datosAsesorEmpresarial.nombre;
        estadia.anteproyecto.datosAsesorEmpresarial.email = datosAsesorEmpresarial.email;
        estadia.anteproyecto.datosAsesorEmpresarial.telefono = datosAsesorEmpresarial.telefono;

        const datosProyecto = anteproyecto.datosProyecto;
        estadia.anteproyecto.datosProyecto.nombre = datosProyecto.nombre;
        estadia.anteproyecto.datosProyecto.objetivo = datosProyecto.objetivo;
        estadia.anteproyecto.datosProyecto.descripcion = datosProyecto.descripcion;

        estadia.anteproyecto.estado.nombre = anteproyecto.estado.nombre;
        estadia.anteproyecto.estado.motivo = anteproyecto.estado.motivo;
        estadia.anteproyecto.estado.fecha = anteproyecto.estado.fecha;

        estadia.anteproyecto.fechaRegistro = anteproyecto.fechaRegistro;
        await Estadia.findByIdAndUpdate(estadia._id, estadia);
        res.json(estadia.anteproyecto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Ver informacion y estado de Avance
router.post('/academico/avance', async (req, res) => {
    try {
        const idAlumno = req.body.idAlumno;
        const filtro = {
            idAlumno: new ObjectId(idAlumno)
        }
        const estadia = await Estadia.findOne(filtro);
        const avance = estadia.avance;

        if (avance !== null && avance !== undefined) {
            res.json(avance);
        } else {
            res.json("No se encontro ningun avance")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;