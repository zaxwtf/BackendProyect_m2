
const fs = require('node:fs').promises;
const path = require('path')

const RUTA = path.join(__dirname, "../../videojuegos.json")

async function cargarJuegos() {
    const contenido = await fs.readFile(RUTA, "utf-8");
    return JSON.parse(contenido)
}


async function guardarJuegos(juegos) {
    await fs.writeFile(RUTA, JSON.stringify(juegos, null, 2), "utf-8")
}



const obtenerJuegos = async (req, res) => {
    const juegos = await cargarJuegos()
    return res.json(juegos)
}

const obtenerJuegoID = async (req, res) =>{
    const juegos = await cargarJuegos()
    const id = Number(req.params.id)
    const videojuegoFind = juegos.find(p => p.id === id)
    if (videojuegoFind){
        return res.json(videojuegoFind)
    } else{
        return res.status(404).json()
    }
    
}


const crearJuego = async (req, res) => {
    const juegos = await cargarJuegos()
    let nuevoJuego = {
        id: juegos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    juegos.push(nuevoJuego)
    const NuevoJSON = await guardarJuegos(juegos)

    return res.status(201).json(nuevoJuego)
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