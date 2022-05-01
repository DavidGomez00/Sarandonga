const express = require('express');
const mongoose = require('mongoose');
const {Clientes, Cliente} = require('../models/cliente');

// router
const router = express.Router();

router.put('/:id', async (req, res) => {

    // Generos
    const generos = await Genero.find();

    // Cliente
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, {
        generosfav : req.body.generos_fav
    }, {new : true});

    res.send().status(200);
});

router.post('/',async (req, res) => { //añadir cliente

    // New genero
    const cliente = new Cliente({
        nombre : req.body.nombre,
        generosfav : req.body.generos,
        password : req.body.password,
        edad : req.body.edad,
        mujer: req.body.mujer
    });

    await cliente.save();
    res.status(201).send(cliente);
});

router.get('/:id', async (req, res) => { //dame cliente
    const currentUser = await User.findbyId(req.params.id);
    if(!currentUser) return res.status(404).send('No user with that id was found');
    res.status(200).send(currentUser);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findbyId(req.params.id);
    if(!user) return res.status(404).send('No user with that id was found');
    res.status(200).send(user);
});

module.exports = router;