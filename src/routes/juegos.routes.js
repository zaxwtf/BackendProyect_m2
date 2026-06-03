const { Router } = require('express');
const router = Router();
const juegosController = require('../controllers/juegos.controller');
const { validarJuego } = require('../middlewares/validarJuego');
const { validate } = require('../middlewares/validar');


//Definimos rutas de get y post y enlazamos a la función del controller
router.get('/', juegosController.obtenerJuegos);
router.get('/:id', juegosController.obtenerJuegoID)
router.post('/crear', validarJuego, validate, juegosController.crearJuego);
router.delete('/borrar/:id', juegosController.borrarJuego)
router.put('/cambiar/:id', juegosController.actualizarJuego);

module.exports = router;