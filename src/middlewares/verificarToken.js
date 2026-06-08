const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader){
            return res.status(401).json({message: "No hay token"})
        }

        const token = authHeader.split(" ")[1]

        const data = jwt.verify(token, process.env.JWT_SECRET)

        req.usuario = data

        next()
    }catch(error){
        return res.status(500).json({message: "error interno del servidor", error})
    }
}


module.exports = {
    verifyToken
}