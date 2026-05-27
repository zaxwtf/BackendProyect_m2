


let usuarios = [
    {id: 1, nombre: "Jesús", username: "elcrack05", email: "jesus@example.com" }
]


const crearUsuario = (req, res) =>{
    const {nombre, username, email} = req.body
    let nuevoUser = {
        id: usuarios.length + 1,
        nombre: nombre,
        username: username,
        email: email
    };
    usuarios.push(nuevoUser)

    return res.status(201).json(nuevoUser)
}


const obtenerUsuarios = (req, res) => {
    return res.json(usuarios)
}


module.exports = {
    crearUsuario,
    obtenerUsuarios
}