const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Vinculador = require('../models/vinculador');

/* Vinculacion */

// POST - Busqueda de todos los vinculadores
router.post('/vinculadores', async (req, res) => {
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
            }
            arrVinculadores.push(infoVinculador);
        }
        res.json(arrVinculadores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Busqueda de todos los vinculadores
router.post('/vinculadores/excel', async (req, res) => {
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
            }
            arrVinculadores.push(infoVinculador);
        }

        const data = arrVinculadores;
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

// POST - Crear nuevo vinculador
router.post('/vinculador/crear', async (req, res) => {
    try {
        const password = req.body.vinculador.datosPersonales.privado.password;

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                throw new Error('Error al generar el hash de la contraseña');
            }
            const vinculador = new Vinculador({
                datosPersonales: {
                    nombres: {
                        nombre: req.body.vinculador.datosPersonales.nombres.nombre,
                        apPaterno: req.body.vinculador.datosPersonales.nombres.apPaterno,
                        apMaterno: req.body.vinculador.datosPersonales.nombres.apMaterno
                    },
                    privado: {
                        email: req.body.vinculador.datosPersonales.privado.email,
                        username: req.body.vinculador.datosPersonales.privado.username,
                        password: hash
                    }
                },
                fechaRegistro: new Date(req.body.vinculador.fechaRegistro)
            });
            const newVinculador = await vinculador.save();
            res.status(201).json(newVinculador);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST - Perfil de vinculador (informacion general)
router.post('/vinculador/perfil', async (req, res) => {
    try {
        const idVinculador = req.body.vinculador;
        const vinculador = await Vinculador.findById(idVinculador);
        res.json(vinculador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/vinculador/perfil/modificar', async (req, res) => {
    try {
        const idVinculador = req.body.vinculador.idVinculador;
        const vinculador = await Vinculador.findById(idVinculador);

        const newPassword = req.body.vinculador.datosPersonales.privado.password;
        const currentPassword = vinculador.datosPersonales.privado.password;

        if (newPassword && newPassword !== currentPassword) {
            bcrypt.hash(newPassword, 10, async (err, hash) => {
                if (err) {
                    throw new Error('Error al generar el hash de la contraseña');
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

        vinculador.datosPersonales.nombres.nombre = body.vinculador.datosPersonales.nombres.nombre || vinculador.datosPersonales.nombres.nombre;
        vinculador.datosPersonales.nombres.apPaterno = body.vinculador.datosPersonales.nombres.apPaterno || vinculador.datosPersonales.nombres.apPaterno;
        vinculador.datosPersonales.nombres.apMaterno = body.vinculador.datosPersonales.nombres.apMaterno || vinculador.datosPersonales.nombres.apMaterno;

        vinculador.datosPersonales.privado.email = body.vinculador.datosPersonales.privado.email || vinculador.datosPersonales.privado.email;
        vinculador.datosPersonales.privado.username = body.vinculador.datosPersonales.privado.username || vinculador.datosPersonales.privado.username;

        const newVinculador = await vinculador.save();
        res.status(201).json(newVinculador);
    } catch (error) {
        throw new Error('Error al guardar el asesor');
    }
}

// DELETE - Borrar vinculador
router.post('/vinculador/perfil/borrar', async (req, res) => {
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

module.exports = router;