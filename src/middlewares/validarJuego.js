const genders = [
    "lucha",
    "rpg",
    "arcade",
    "plataformas",
    "disparos",
    "simulacion",
    "estrategia",
    "a_rpg"
]


const validarProducto = (req, res, next) =>{
    const {nombre, precio, genero} = req.body;
    if (!nombre || !precio || !genero){
        return res.status(404).json({error: "El juego debe tener nombre, precio y género"})
    } else if (!(genders.includes(genero))){
        return res.status(404).json({error: "El juego debe tener un género valido"})
    }

    next()
};

module.exports = validarProducto