import { Router } from "express";
const router = Router()
import * as usuariosController from "../controllers/usuarios.controller.js";
import validarUser from "../middlewares/validarUser.js";
import validate from "../middlewares/validar.js";
import verifyToken from "../middlewares/verificarToken.js";



//Rutas usuarios

router.post('/crear', validarUser, validate, usuariosController.crearUser);
router.get('/email', usuariosController.obtenerUserByEmail)
router.get('/profile', verifyToken, usuariosController.getProfile)
//router.post('/profile/favs', verifyToken, usuariosController.agregarJuegoFav)
router.post('/login', usuariosController.loginUser)
router.get('/:id', usuariosController.obtenerUserById)



export default router;