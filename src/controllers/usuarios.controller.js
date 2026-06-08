const modelUsers = require('../models/users.models')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')

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
        const passwordHashed = await bcrypt.hash(password, 10)
        const emailExiste = await modelUsers.validateEmail(email)
        if (emailExiste){
            console.log(emailExiste)
            return res.status(409).json("Este email ya está registrado")
        }
        const newUser = await modelUsers.crearUser({nombre, apellido1, apellido2, userName, userNameUnico, email, password: passwordHashed})
        
        if (!newUser){
            return res.status(404).json("Error del usuario")
        }

        return res.status(201).json(newUser)
    }catch(error){
        console.error("Error al crear usuario", error)
        res.status(500).json("Error interno del servidor")
    }
}


async function loginUser(req, res) {
    try{
        const {email, password} = req.body
        const user = await modelUsers.getUsersByEmail(req.body.email)

        if (!user){
            return res.status(401).json({"error": "Credenciales incorrectas"})
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match){
            return res.status(401).json({"error": "Credenciales incorrectas"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.status(201).json({
            message: "login correcto",
            token
        });
    } catch(error){
        console.error("error:", error)
        res.status(500).json({"error": "Error en login"})
    }

}


async function getProfile(req, res) {
    try{
        const userId = req.usuario.id

        const userFound = await modelUsers.getUsersById(userId)

        return res.status(200).json({message: "Usuario encontrado", user: userFound})

    }catch(error){
        res.status(500).json({message: "Error interno del sistema", error});
    }
}


module.exports = {
    obtenerUserById,
    obtenerUserByEmail,
    crearUser,
    loginUser,
    getProfile
}