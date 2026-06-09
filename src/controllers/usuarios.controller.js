import * as modelUsers from "../models/users.models.js";
import * as modelJuegos from "../models/videojuegos.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function obtenerUserById(req, res) {
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


export async function obtenerUserByEmail(req, res) {
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


export async function crearUser(req, res){
    const {nombre, apellido1, apellido2, userName, email, password, juegosFav} = req.body
    const userNameUnico = `${userName}#${Math.trunc(Math.random() * 1000)}`
    try{
        const passwordHashed = await bcrypt.hash(password, 10)
        const emailExiste = await modelUsers.validateEmail(email)
        if (emailExiste){
            console.log(emailExiste)
            return res.status(409).json("Este email ya está registrado")
        }
        const newUser = await modelUsers.crearUser({nombre, apellido1, apellido2, userName, userNameUnico, email, password: passwordHashed, juegosFav})
        
        if (!newUser){
            return res.status(404).json("Error del usuario")
        }

        return res.status(201).json(newUser)
    }catch(error){
        console.error("Error al crear usuario", error)
        res.status(500).json("Error interno del servidor")
    }
}


export async function loginUser(req, res) {
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


export async function getProfile(req, res) {
    try{
        const userId = req.usuario.id

        const userFound = await modelUsers.getUsersById(userId)

        return res.status(200).json({message: "Usuario encontrado", user: userFound})

    }catch(error){
        res.status(500).json({message: "Error interno del sistema", error});
    }
}


export async function agregarJuegoFav (req, res) {
    const {gameId} = req.body
    console.log("console log inicio agregarjuegoFav",gameId)
    try{
        const userId = req.usuario.id
        console.log("userID: ", userId)
        const gameAdded = await modelUsers.saveGameFav(userId, gameId)

        console.log("clg para gameadded", gameAdded)

        return res.status(201).json(gameAdded)
    }catch(error){
        console.error("Error al crear juego", error)
        return res.status(500).json({"error": "Error al agregar el juego"})
    }
}

