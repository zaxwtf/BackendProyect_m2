const { Router } = require('express');
const router = Router();
const juegosController = require('../controllers/juegos.controller');
const validarJuego = require('../middlewares/validarJuego')


//Definimos rutas de get y post y enlazamos a la función del controller
router.get('/', juegosController.obtenerJuegos);
router.get('/:id', juegosController.obtenerJuegoID)
router.post('/crear', validarJuego, juegosController.crearJuego);

module.exports = router;