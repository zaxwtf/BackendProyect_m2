const fs = require('fs').promises
const path = require('path')

const RUTA = path.join(__dirname, "videojuegos.json")

async function leerVideojuegos() {
    try{
        const contenido = await fs.readFile(RUTA, "utf-8")
        return JSON.parse(contenido)
    } catch(error){
        if (error.code === "ENOENT"){
            await fs.writeFile(RUTA, "[]", "utf-8")
            return []
        }
        throw error
    }
}

async function escribirVideojuegos(videojuegos) {
    await fs.writeFile(RUTA, JSON.stringify(videojuegos, null, 2), "utf-8")
}


async function getAllVideogames() {
    return await leerVideojuegos()
}

async function getVideojuegosById(id) {
    const videojuegos = await leerVideojuegos()
    return videojuegos.find(juego => juego.id === id) || null;
}

async function crearJuego(data) {
    const juegos = await leerVideojuegos()
    const newId = juegos.length > 0 ? Math.max(...juegos.map(n => n.id)) + 1 : 1;
    const newGame = {id: newId, ...data}
    juegos.push(newGame)
    await escribirVideojuegos(juegos)
    return newGame
}

async function updateJuegos(id, data) {
    const juegos = await leerVideojuegos()
    const indice = juegos.findIndex(p => p.id === id)
    if (indice === -1) return null
    juegos[indice] = {id, ...data}
    await escribirVideojuegos(juegos)
    return juegos[indice]
}

async function deleteGame(id) {

    const juegos = await leerVideojuegos()
    const videojuegoFind = juegos.find(p => p.id === id)
    if (videojuegoFind){
        const NuevoVideojuegos = juegos.filter(p => p.id !== id )
        const NuevoJSON = await escribirVideojuegos(NuevoVideojuegos)
        return NuevoVideojuegos
    }
}


module.exports = {
    getAllVideogames,
    getVideojuegosById,
    crearJuego,
    updateJuegos,
    deleteGame
}