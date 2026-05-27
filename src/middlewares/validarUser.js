const validarUsuario = (req, res, next) =>{
    const {nombre, username, email} = req.body
    if (!nombre || !username || !email){
        res.status(404).json("Son necesarios nombre, username y email ")
    }else{
        next()
    }
}

module.exports = validarUsuario