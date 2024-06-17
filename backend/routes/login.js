const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { promisify } = require('util');
const compareAsync = promisify(bcrypt.compare);

const SuperAdministrador = require('../models/superAdmin');
const Administrador = require('../models/administrador');
const Vinculacion = require('../models/vinculador');
const Asesor = require('../models/asesor');
const Alumno = require('../models/alumno');
const Estadia = require('../models/estadia');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'angelgaelleija2@gmail.com',
        pass: 'fhbbdaohipcymxbr'
    }
});

router.post('/', async (req, res) => {
    try {
        const usuario = req.body.usuario;
        const password = req.body.password;

        const response = {}

        const alumno = await Alumno.findOne({
            "datosPersonales.privado.matricula": usuario,
        });

        if (alumno !== null && alumno !== undefined) {
            const isMatch = await compareAsync(password, alumno.datosPersonales.privado.password);
            if (isMatch) {
                response.tipoUsuario = "alumno";
                response.id = alumno._id;
                response.nombre = alumno.datosPersonales.nombres.nombre;
                response.apPaterno = alumno.datosPersonales.nombres.apPaterno;
                response.apMaterno = alumno.datosPersonales.nombres.apMaterno;

                const estadia = await Estadia.findOne({ idAlumno: new ObjectId(alumno._id) });

                if (!estadia) {
                    const nuevaEstadia = new Estadia({ idAlumno: alumno._id });
                    await nuevaEstadia.save();
                }

                return res.json(response);
            } else {
                return res.status(401).json("Contraseña incorrecta");
            }
        }

        let query = {};

        const asesor = await Asesor.findOne({
            "datosPersonales.privado.email": usuario
        });
        if (asesor !== null && asesor !== undefined) {
            const isMatch = await compareAsync(password, asesor.datosPersonales.privado.password);
            if (isMatch) {
                response.tipoUsuario = "asesor";
                response.id = asesor._id;
                response.nombre = asesor.datosPersonales.nombres.nombre;
                response.apPaterno = asesor.datosPersonales.nombres.apPaterno;
                response.apMaterno = asesor.datosPersonales.nombres.apMaterno;
                return res.json(response);
            } else {
                return res.status(401).json("Contraseña incorrecta");
            }
        }

        const admin = await Administrador.findOne({
            "username": usuario
        });
        if (admin !== null && admin !== undefined) {
            const isMatch = await compareAsync(password, admin.password);
            if (isMatch) {
                response.tipoUsuario = "administrador";
                response.id = admin._id;
                response.username = admin.username;
                response.carrera = admin.carrera;
                return res.json(response);
            } else {
                return res.status(401).json("Contraseña incorrecta");
            }
        }

        const superAdmin = await SuperAdministrador.findOne({
            "username": usuario,
        });
        if (superAdmin !== null && superAdmin !== undefined) {
            const isMatch = await compareAsync(password, superAdmin.password);
            if (isMatch) {
                response.tipoUsuario = "superAdministrador";
                response.id = superAdmin._id;
                response.username = superAdmin.username;
                response.career = superAdmin.carrera;
                return res.json(response);
            } else {
                return res.status(401).json("Contraseña incorrecta");
            }
        }

        const vinculacion = await Vinculacion.findOne({
            "datosPersonales.privado.username": usuario
        });
        if (vinculacion !== null && vinculacion !== undefined) {
            const isMatch = await compareAsync(password, vinculacion.datosPersonales.privado.password);
            if (isMatch) {
                response.tipoUsuario = "vinculacion";
                response.id = vinculacion._id;
                response.nombre = vinculacion.datosPersonales.nombres.nombre;
                response.apPaterno = vinculacion.datosPersonales.nombres.apPaterno;
                response.apMaterno = vinculacion.datosPersonales.nombres.apMaterno;
                return res.json(response);
            } else {
                return res.status(401).json("Contraseña incorrecta");
            }
        }

        return res.status(404).json("No se encontró ningún usuario");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const password = req.body.alumno.datosPersonales.privado.password;

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                throw new Error('Error al generar el hash de la contraseña');
            }
            const alumno = new Alumno({
                datosPersonales: {
                    nombres: {
                        nombre: req.body.alumno.datosPersonales.nombres.nombre,
                        apPaterno: req.body.alumno.datosPersonales.nombres.apPaterno,
                        apMaterno: req.body.alumno.datosPersonales.nombres.apMaterno
                    },
                    privado: {
                        matricula: req.body.alumno.datosPersonales.privado.matricula,
                        email: req.body.alumno.datosPersonales.privado.email,
                        password: hash
                    }
                },
                datosAcademicos: {
                    nivelAcademico: req.body.alumno.datosAcademicos.nivelAcademico,
                    turno: req.body.alumno.datosAcademicos.turno,
                    carrera: req.body.alumno.datosAcademicos.carrera,
                    area: req.body.alumno.datosAcademicos.area,
                    grado: req.body.alumno.datosAcademicos.grado,
                    grupo: req.body.alumno.datosAcademicos.grupo,
                },
                fechaRegistro: new Date()
            });
            const newAlumno = await alumno.save();
            res.status(201).json(newAlumno);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

function generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 9000);
}

function sendVerificationEmail(email, verificationCode) {
    const mailOptions = {
        from: 'angelgaelleija2@gmail.com',
        to: email,
        subject: 'Código de verificación de recuperación de contraseña',
        text: `Tu código de verificación es: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
}

router.post('/recuperacion/enviar-email', async (req, res) => {
    try {
        const email = req.body.email;
        const alumno = await Alumno.findOne({ "datosPersonales.privado.email": email });

        if (!alumno) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        const verificationCode = generateVerificationCode();

        if (!alumno.cambiarPassword) {
            alumno.cambiarPassword = {
                codigo: verificationCode,
                fecha: new Date()
            };
        } else {
            alumno.cambiarPassword.codigo = verificationCode;
            alumno.cambiarPassword.fecha = new Date();
        }

        await Alumno.findByIdAndUpdate(alumno._id, alumno);

        sendVerificationEmail(email, verificationCode);

        res.json({ message: 'Código de verificación enviado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/recuperacion/verificar-codigo', async (req, res) => {
    try {
        const email = req.body.email;
        const token = req.body.token;

        const alumno = await Alumno.findOne({ "datosPersonales.privado.email": email });

        if (!alumno) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        if (alumno.cambiarPassword.codigo){
            if (token.toString() === alumno.cambiarPassword.codigo.toString()){
                return res.json({ message: 'Codigo correcto' });
            }
            else {
                return res.status(404).json({ message: 'Codigo incorrecto' });
            }
        }
        
        return res.status(404).json({ message: 'No se ha encontrado ningun codigo' })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/recuperacion/cambiar-password', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const alumno = await Alumno.findOne({ "datosPersonales.privado.email": email });

        if (!alumno) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                throw new Error('Error al generar el hash de la contraseña');
            }
            alumno.datosPersonales.privado.password = hash;
            await Alumno.findByIdAndUpdate(alumno._id, alumno);

            const emailAdmin = defineEmailAdmin(alumno.datosAcademicos.carrera);
            const nameStudent = `${alumno.datosPersonales.nombres.nombre} ${alumno.datosPersonales.nombres.apPaterno} ${alumno.datosPersonales.nombres.apMaterno}`;
            sendPasswordToAdmin(emailAdmin, nameStudent, password);

            res.status(201).json({ message: "Contraseña cambiada correctamente" });
            
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

function sendPasswordToAdmin(email, student, password) {
    const mailOptions = {
        from: 'angelgaelleija2@gmail.com',
        to: email,
        subject: `El estudiante ${student} ha cambiado su contraseña`,
        text: `El estudiante ${student} ha cambiado su contraseña a: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
}

function defineEmailAdmin(career) {
    const administrador = await.Administrador.findOne({ "carrera": career });
    return administrador.email;
}

module.exports = router;