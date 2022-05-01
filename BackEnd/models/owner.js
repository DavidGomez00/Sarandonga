
const mongoose = require('mongoose');

const owner = new mongoose.Schema({
    nombre : {type: String, required: true, maxlength: 80 },
    nombreEmpresa: {type: String, required: true, maxlength: 80 },
    listaLocales: [
        {type: mongoose.Types.ObjectId} //Mayor consistencia de datos
    ],
    password: {type: String, required: true, maxlength: 20}
    
});

// Creo la clase
const Owner = mongoose.model('Owner', owner);

// Exportamos el modulo 
module.exports.Owner = Owner

