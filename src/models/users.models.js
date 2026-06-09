import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        apellido1: {
            type: String,
            required: true,
        },
        apellido2: {
            type: String,
            required: false,
        },
        userName: {
            type: String,
            required: true,
        },
        userNameUnico: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        juegosFav: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Videogame",
            required: true
        }],
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)


export async function getUsersById(id) {
    return await User.findById(id).select("-password")
}

export async function getUsersByEmail(email) {
    return await User.findOne({email: email})
}

export async function crearUser(data) {
    const newUser = new User(data)
    return await newUser.save()
}

export async function updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })
}

export async function deleteUser(id) {
    return await User.findByIdAndDelete(id)
}

export async function validateEmail(email){
    return await User.findOne({email: email})
}

export async function saveGameFav(userId, gameId){
    console.log(userId, gameId)
    const resultado = await User.updateOne({_id: userId}, {$addToSet: {juegosFav: gameId}})
    return resultado
}

export async function getFavVideogames(userId) {
    const juegosFav = await User.findById(userId).select('juegosFav -_id').populate("juegosFav")
    return juegosFav
}

export async function deleteFavGame(userId, gameId){
    console.log("estoy dentro del delete")
    const resultado = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {juegosFav: gameId}
        },
        {
            new: true,
            select: "juegosFav -_id"
        }
    ).populate("juegosFav")

    return resultado
}