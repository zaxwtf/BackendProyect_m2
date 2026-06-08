const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message: "No hay token o el formato es incorrecto"})
        }

        const token = authHeader.split(" ")[1]

        const data = jwt.verify(token, process.env.JWT_SECRET)

        req.usuario = data

        next()
    }catch(error){
        if (error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Tu sesión ha caducado:", error})
        }
        return res.status(500).json({message: "error interno del servidor", error})
    }
}


module.exports = {
    verifyToken
}