const modeljuegos = require('../models/videojuegos.models')


async function obtenerJuegos (req, res) {
    try{
        const juegos = await modeljuegos.getAllVideogames()
        return res.status(200).json(juegos)
    } catch (error){
        console.error("error al listar los juegos")
        return res.status(500).json({"error": "Error interno del servidor"})
    }
}

async function obtenerJuegoID (req, res) {
    try{
        const id = Number(req.params.id)
        const juego = await modeljuegos.getVideojuegosById(id)
        console.log(juego)
        if(!juego) {
            return res.status(404).json({"error": "ID invalido"})
        }
        return res.status(200).json(juego)
    } catch (error){
        console.error("Error al obtener juego")
        return res.status(500).json({"error": "Error interno del servidor"})
    }

}



async function crearJuego (req, res) {
    const {nombre, precio} = req.body
    try{
        const juego = await modeljuegos.crearJuego({nombre, precio})
        return res.status(201).json(juego)
    }catch(error){
        console.error("Error al crear juego")
        return res.status(500).json({"error": "Error interno del servidor"})
    }
}

const borrarJuego = async (req, res) => {
    const juegos = await cargarJuegos()
    const id = Number(req.params.id)
    const videojuegoFind = juegos.find(p => p.id === id)
    if (videojuegoFind){
        const NuevoVideojuegos = juegos.filter(p => p.id !== id )
        const NuevoJSON = await guardarJuegos(NuevoVideojuegos)

        return res.status(200).json(videojuegoFind)
    } else{
        return res.status(404).json()
    }
}

const actualizarJuego = async (req, res) => {
    const juegos = await cargarJuegos()
    const id = Number(req.params.id)
    const videojuegoFind = juegos.find(p => p.id === id)
    const indice = juegos.indexOf(videojuegoFind)
    if (videojuegoFind){
    juegos[indice].nombre = req.body.nombre
    juegos[indice].precio = req.body.precio
    await guardarJuegos(juegos)
    
        return res.json(juegos)
    } else{
        return res.status(404).json()
    }
}


module.exports = {
    obtenerJuegos,
    obtenerJuegoID,
    crearJuego,
    borrarJuego,
    actualizarJuego
}