const { body, validationResult } = require('express-validator')

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

const validarJuego = [
    body('nombre')
        .notEmpty().withMessage('El juego debe tener nombre'),
    body('precio')
        .notEmpty().withMessage('El juego debe tener precio')
        .isNumeric().withMessage('El precio debe ser un número'),
    body('genero')
        .notEmpty().withMessage('El juego debe tener género')
        .custom(genero => genders.includes(genero))
        .withMessage('El juego debe tener un género válido')
]

function validate(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    next()
}

module.exports = {
    validarJuego,
    validate
}