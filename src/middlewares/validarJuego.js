const validarProducto = (req, res, next) =>{
    const {nombre, precio} = req.body;
    if (!nombre || !precio){
        return res.status(400).json({error: "El juego debe tener nombre y precio"})
    }

    next()
};

module.exports = validarProducto