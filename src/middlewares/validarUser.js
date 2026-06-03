const { body, validationResult } = require('express-validator')


const validarUser = [
    body('nombre')
        .isLength({min: 2, max: 40}).withMessage('El usuario debe tener nombre'),
    body('apellido1')
        .isLength({min: 2, max: 40}).withMessage('El usuario debe tener por lo menos el primer apellido'),
    body('userName')
        .isLength({min: 2, max: 40}).withMessage('El usuario debe tener nombre de usuario'),
    body('email')
        .isLength({min: 2, max: 40}).isEmail().withMessage('El usuario debe tener un correo valido'),
    body('password')
        .isLength({min: 8, max: 20}).withMessage('La contraseña debe ser de entre 8 y 20 caracteres')
]

module.exports ={
validarUser
}