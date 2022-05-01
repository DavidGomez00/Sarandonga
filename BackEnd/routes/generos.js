const express = require('express');
const { route } = require('express/lib/application');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const {Genero} = require('../models/genero');

// router
const router = express.Router();

router.get('/', async (req, res) => {

    // Retornamos todos los generos
    const generos = await Genero.find();

    res.send(locals).status(200);
});

router.post('/', async (req, res) => {
    
    // New genero
    const genero = new Genero({
        nombre : req.body.nombre
    });

    await genero.save();
    res.status(201).send(genero);

});

router.get('/:id', async (req, res) => { //dame genero
    const genero = await Genero.findbyId(req.params.id);
    if(!genero) return res.status(404).send('NO user with that id was found')
    res.status(200).send(genero)
});

router.delete('/:id', async (req, res) => {

    const genero = await Genero.findbyId(req.params.id);
    if(!genero) return res.status(404).send('NO user with that id was found')
    res.status(200).send(genero)

});

router.put('/:id', async (req, res) => {
    const genero = await Genero.findByIdAndUpdate(req.params.id, {
        nombre : req.body.nombre
    }, {new : true})
});

module.exports = router;