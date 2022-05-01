const res = require('express/lib/response');
const mongoose = require('mongoose');

// Modelo del mongoose
const genero = new mongoose.Schema({
    nombre: {type: String, required: true, maxlength: 30 }
});

async function validateGenero(nombre) {

    // parametros
    const filter = nombre;
    const generos = await Genero.find({});

    // Filtro
    const genero = await Genero.find({nombre:filter["genero"]})

    if(genero == undefined) return null;

    return genero;
}

// Creo la clase
const Genero = mongoose.model('Genero', genero);

// Exportamos el modulo 
module.exports.Genero = Genero;
module.exports.validate = validateGenero;