//Datos de prueba
let videojuegos = [
    {id: 1, nombre: "God of War", precio: 30},
    {id: 2, nombre: "Red Dead Redemption 2", precio: 40},
    {id: 3, nombre: "Pokemon diamante", precio: 20},
    {id: 4, nombre: "Mario Galaxy", precio: 25},
    {id: 5, nombre: "Sonic Adventure", precio: 35}
];


const obtenerJuegos = (req, res) => {
    return res.json(videojuegos)
}

const obtenerJuegoID = (req, res) =>{
    const id = Number(req.params.id)
    const videojuegoFind = videojuegos.find(p => p.id === id)
    if (videojuegoFind){
        return res.json(videojuegoFind)
    } else{
        return res.status(404).json()
    }
    
}


const crearJuego = (req, res) => {
    let nuevoJuego = {
        id: videojuegos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    videojuegos.push(nuevoJuego)

    return res.status(201).json(nuevoJuego)
}

const borrarJuego = (req, res) => {
    const id = Number(req.params.id)
    const videojuegoFind = videojuegos.find(p => p.id === id)
    if (videojuegoFind){
        const NuevoVideojuegos = videojuegos.filter(p => p.id !== id )
        videojuegos = NuevoVideojuegos

        return res.status(200).json(videojuegoFind)
    } else{
        return res.status(404).json()
    }
}

const actualizarJuego = (req, res) => {
    const id = Number(req.params.id)
    const videojuegoFind = videojuegos.find(p => p.id === id)
    const indice = videojuegos.indexOf(videojuegoFind)
    if (videojuegoFind){
    videojuegos[indice].nombre = req.body.nombre
    videojuegos[indice].precio = req.body.precio
        return res.json(videojuegos)
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