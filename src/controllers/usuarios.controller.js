const modelUsers = require('../models/users.models')

async function obtenerUserById(req, res) {
    const id = req.params.id
    try{
        const User = await modelUsers.getUsersById(id)
        if (!User){
            return res.status(404).json("Error del usuario")
        }
        return res.status(200).json(User)
    }catch(error){
        console.error("Error al obtener usuario", error)
        res.status(500).json("Error interno del servidor")
    }
}


async function obtenerUserByEmail(req, res) {
    const email = req.query.email
    try{
        if (!email) {
            return res.status(400).json("Falta el email para la búsqueda")
        }
        const User = await modelUsers.getUsersByEmail(email)
        if (!User){
            return res.status(404).json("Usuario no encontrado")
        }
        return res.status(200).json(User)
    }catch(error){
        console.error("Error al encontrar usuario", error)
        res.status(500).json("Error interno del servidor")
    }
}


async function crearUser(req, res){
    const {nombre, apellido1, apellido2, userName, email, password} = req.body
    const userNameUnico = `${userName}#${Math.trunc(Math.random() * 1000)}`
    try{
        const newUser = await modelUsers.crearUser({nombre, apellido1, apellido2, userName, userNameUnico, email, password})
        if (!newUser){
            return res.status(404).json("Error del usuario")
        }
        return res.status(200).json(newUser)
    }catch(error){
        console.error("Error al crear usuario", error)
        res.status(500).json("Error interno del servidor")
    }
}


module.exports = {
    obtenerUserById,
    obtenerUserByEmail,
    crearUser
}