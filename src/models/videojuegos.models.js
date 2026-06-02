const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
    {
        nombre: {
            type: String || Number,
            required: true,
            trim: true,
        },
        precio: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Videogame = mongoose.model("Videogame", gameSchema)


async function getAllVideogames() {
    return await Videogame.find()
}

async function getVideojuegosById(id) {
    return await Videogame.findById(id)
}

async function crearJuego(data) {
    const newGame = new Videogame(data)
    return await newGame.save()
}

async function updateJuegos(id, data) {
    return await Videogame.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })
}

async function deleteGame(id) {
    return await Videogame.findByIdAndDelete(id)
}


module.exports = {
    getAllVideogames,
    getVideojuegosById,
    crearJuego,
    updateJuegos,
    deleteGame
}