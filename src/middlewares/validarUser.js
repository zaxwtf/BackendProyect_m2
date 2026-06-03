const { body, validationResult } = require('express-validator')


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

module.exports ={
validarUser
}