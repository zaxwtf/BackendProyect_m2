import { body, validationResult } from "express-validator";

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
    body('plataforma')
        .notEmpty().withMessage('El juego debe tener precio')
        .isNumeric().withMessage('El precio debe ser un número'),
    body('genero')
        .notEmpty().withMessage('El juego debe tener género')
        .custom(genero => genders.includes(genero))
        .withMessage('El juego debe tener un género válido'),
    body('completado')
        .notEmpty().withMessage('Se debe indicar si el juego ha sido completado o no')
]

export default validarJuego;