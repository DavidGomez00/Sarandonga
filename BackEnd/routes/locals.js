const express = require('express');
const mongoose = require('mongoose');
const { Genero } = require('../models/genero');
const {Local} = require('../models/local');

// router
const router = express.Router();

router.get('/', async (req, res) => {

    const filters = req.query;
    // Retornamos todos los locales
    const locals = await Local.find({});

    // Filtro de locales
    let localsFiltered = locals;
    if (filters != undefined) {
        const genero = await Genero.find({nombre:filters["genero"]}); //obtengo objeto genero, del genero en filtres
        localsFiltered = localsFiltered.filter(local => local.genero.includes(genero._id)); ///api/local&genero="..."
    }

    // Respuesta
    res.send(localsFiltered).status(200);
});

router.post('/:id', async (req, res) => {
    
    // Parametros
    const desc = '';
    const generos = [];

    for (i=0; i<req.body.generos.maxlength(); i++) {
        // verificar el string de los generos
        const genero = Genero.validate(req.body.nombre);
        let code = 201;
        if(!genero){
            code = 404;
        }
        
        // añadir el id del genero al local
        txt_generos += req.body.generos[i].nombre;
    }
    if(code == 201){
        const nLocal = new Local ({
            nombre: req.body.nombre,
            // cambiar a los objects
            generos: req.body.generos,
            description: txt_generos,
            direccion: req.body.direccion
        });
    }

    await nLocal.save();
    res.status(code).send(nLocal); // DEVOLVEMOS CODIGO ERROR
});

router.delete('/:id', async (req, res) => {

    // Encontramos el local a eliminar
    const local = await Local.findById(req.params.id, {}, {new : true}); 

    // Comprobamos que no es nulo
    if (!local) res.status(404).send('No se ha encontrado el local especificado.');

    res.status(200).send(local);

});

router.put('/:id', async (req, res) => {
    const local = await Local.findByIdAndUpdate(req.params.id, {
        nombre : req.body.nombre,
        generos : req.body.generos,
        descripcion : req.body.descripcion,
        direccion : req.body.direccion
    }, {new : true})
});


async function getRecomendation(local) {

    // Query
    const nombreLocal = local.name;

    // Create a recomender
    const recommender = new ContentBasedRecommender({
        minScore: 0.1,
        maxSimilarDocs: 100
    });

    // Get the documents
    const docs = getFormatedLocals();
    
    // Train the recommender
    recommender.train(docs);

    // get top 10 similar Docs
    const simDocs = recommender.getSimilarDocuments(nombreLocal, 0, 10);
}

module.exports = router;