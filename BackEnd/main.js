const express = require('express');
const mongoose = require('mongoose');

// Inicializo express con json
const app = express();
app.use(express.json());

// Anhadimos el fichero de rutas
const locals = require('./routes/locals');
app.use('/api/locales', locals);

mongoose.connect('db',{ useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('Connected'));

// Puerto de conexión
const server = app.listen(8080);

// Exportar el fichero para que pueda ser usado
module.exports = server;