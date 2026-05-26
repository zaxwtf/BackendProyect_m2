const express = require('express')
const rutasJuegos = require('./routes/juegos.routes')

const app = express()

//Middlewares
app.use(express.json())


//rutas globales
app.use('/api/juegos', rutasJuegos)


module.exports = app;