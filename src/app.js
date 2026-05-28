const express = require('express')
const rutasJuegos = require('./routes/juegos.routes')
const rutasUsuarios = require('./routes/usuarios.routes')
const cors = require('cors')

const app = express()

//Middlewares
app.use(express.json())


//rutas globales
app.use('/api/juegos', rutasJuegos)
app.use('/api/usuarios', rutasUsuarios)


module.exports = app;