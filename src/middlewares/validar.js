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

const validarUser = [
    body('nombre')
        .notEmpty().withMessage('El usuario debe tener nombre'),
    body('apellido1')
        .notEmpty().withMessage('El usuario debe tener por lo menos el primer apellido'),
    body('userName')
        .notEmpty().withMessage('El usuario debe tener nombre de usuario'),
    body('email')
        .notEmpty().isEmail().withMessage('El usuario debe tener un correo valido'),
    body('password')
        .notEmpty().isLength({min: 8, max: 20}).withMessage('La contraseña debe ser de entre 8 y 20 caracteres')
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
    validarUser,
    validate
}