import { Router } from "express";
const router = Router();
import * as juegosController from "../controllers/juegos.controller.js";
import validarJuego from "../middlewares/validarJuego.js";
import validate from "../middlewares/validar.js";
import verifyToken from "../middlewares/verificarToken.js";


//Definimos rutas de get y post y enlazamos a la función del controller
router.get('/', juegosController.obtenerJuegos);
router.get('/:id', juegosController.obtenerJuegoID);
router.post('/crear', validarJuego, validate, verifyToken, juegosController.crearJuego);
router.delete('/borrar/:id', juegosController.borrarJuego)
router.put('/cambiar/:id', juegosController.actualizarJuego);

export default router;