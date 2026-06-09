import mongoose from "mongoose";

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
        genero: {
            type: String,
            required: true
        },
        completado: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Videogame = mongoose.model("Videogame", gameSchema)


export async function getAllVideogames() {
    return await Videogame.find()
}

export async function getVideojuegosById(id) {
    return await Videogame.findById(id)
}

export async function crearJuego(data) {
    const newGame = new Videogame(data)
    return await newGame.save()
}

export async function updateJuegos(id, data) {
    return await Videogame.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })
}

export async function deleteGame(id) {
    return await Videogame.findByIdAndDelete(id)
}