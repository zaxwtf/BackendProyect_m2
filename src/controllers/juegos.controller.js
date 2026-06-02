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
        const id = req.params.id
        const juego = await modeljuegos.getVideojuegosById(id)
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
    const {nombre, precio, genero, completado} = req.body
    try{
        const juego = await modeljuegos.crearJuego({nombre, precio, genero, completado})
        return res.status(201).json(juego)
    }catch(error){
        console.error("Error al crear juego", error)
        return res.status(500).json({"error": "Error interno del servidor"})
    }
}

async function borrarJuego( req, res) {
    try{
        const juego = await modeljuegos.deleteGame(req.params.id)
        console.log(juego)
        if(!juego) {
            return res.status(404).json({"error": "ID invalido"})
        }
        return res.status(200).json(juego)
    }catch (error){
        console.error("Error al borrar juego")
        return res.status(500).json({'error': 'Error interno del servidor'})
    }
}

async function actualizarJuego (req, res) {
    try{
        const {nombre, precio, genero, completado} = req.body
        const juego = await modeljuegos.updateJuegos(req.params.id, {nombre, precio, genero, completado})
        if(!juego) {
            return res.status(404).json({"error": "ID invalido"})
        }
        res.status(200).json(juego)
    }catch(error){
    console.error('Error al actualizar juego')
    res.status(500).json({'error': 'Error interno del servidor'})
}
}


module.exports = {
    obtenerJuegos,
    obtenerJuegoID,
    crearJuego,
    borrarJuego,
    actualizarJuego
}