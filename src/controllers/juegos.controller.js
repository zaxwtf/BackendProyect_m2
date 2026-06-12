import { getUsersById } from "../models/users.models.js";
import * as modelJuegos from "../models/videojuegos.models.js";


export async function obtenerJuegos (req, res) {
    try{
        const juegos = await modelJuegos.getAllVideogames()
        return res.status(200).json(juegos)
    } catch (error){
        console.error("error al listar los juegos")
        return res.status(500).json({"error": "Error interno del servidor"})
    }
}

export async function obtenerJuegoID (req, res) {
    try{
        const id = req.params.id
        const juego = await modelJuegos.getVideojuegosById(id)
        if(!juego) {
            return res.status(404).json({"error": "ID invalido"})
        }
        return res.status(200).json(juego)
    } catch (error){
        console.error("Error al obtener juego")
        return res.status(500).json({"error": "Error interno del servidor"})
    }

}



export async function crearJuego (req, res) {
    const {nombre, precio, genero, completado} = req.body
    try{
        const autor = await getUsersById(req.usuario.id)
        if(!autor.root){
            return res.status(401).json({message: "es necesario ser root"})
        }
        const juego = await modelJuegos.crearJuego({nombre, precio, genero, completado})
        return res.status(201).json(juego)
    }catch(error){
        console.error("Error al crear juego", error)
        return res.status(500).json({"error": "Error interno del servidor"})
    }
}

export async function borrarJuego(req, res) {
    try{
        const autor = await getUsersById(req.usuario.id)
        if(!autor.root){
            return res.status(401).json({message: "es necesario ser root"})
        }
        const juego = await modelJuegos.deleteGame(req.params.id)
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

export async function actualizarJuego (req, res) {
    try{
        const autor = await getUsersById(req.usuario.id)
        if(!autor.root){
            return res.status(401).json({message: "es necesario ser root"})
        }
        const {nombre, precio, genero, completado} = req.body
        const juego = await modelJuegos.updateJuegos(req.params.id, {nombre, precio, genero, completado})
        if(!juego) {
            return res.status(404).json({"error": "ID invalido"})
        }
        res.status(200).json(juego)
    }catch(error){
    console.error('Error al actualizar juego')
    res.status(500).json({'error': 'Error interno del servidor'})
}
}