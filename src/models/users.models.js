const mongoose = require('mongoose');

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
        email: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)


async function getUsersById(id) {
    return await User.findById(id)
}

async function getUsersByEmail(email) {
    return await User.findOne({email: email})
}

async function crearUser(data) {
    const newUser = new User(data)
    return await newUser.save()
}

async function updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })
}

async function deleteUser(id) {
    return await User.findByIdAndDelete(id)
}


module.exports = {
    getUsersById,
    getUsersByEmail,
    crearUser,
    updateUser,
    deleteUser
}