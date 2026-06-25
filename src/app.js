import express from "express";
import rutasJuegos from "./routes/juegos.routes.js";
import rutasUsuarios from "./routes/usuarios.routes.js";
import cors from "cors";

const app = express()

//Middlewares
app.use(express.json())
app.use(cors())


//rutas globales
app.use('/api/juegos', rutasJuegos)
app.use('/api/usuarios', rutasUsuarios)


export default app;