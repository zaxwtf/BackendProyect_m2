const { Router } = require('express');
const router = Router();
const juegosController = require('../controllers/juegos.controller');
const {body, validationResult} = require('express-validator')
const validate = require('../middlewares/validar')


//Definimos rutas de get y post y enlazamos a la función del controller
router.get('/', juegosController.obtenerJuegos);
router.get('/:id', juegosController.obtenerJuegoID)
router.post('/crear', validate.validarJuego, validate.validate, juegosController.crearJuego);
router.delete('/borrar/:id', juegosController.borrarJuego)
router.put('/cambiar/:id', juegosController.actualizarJuego);

module.exports = router;