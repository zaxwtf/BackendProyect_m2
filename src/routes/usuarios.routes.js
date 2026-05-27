const { Router } = require('express')
const router = Router()
const usuariosController = require('../controllers/usuarios.controller');
const validarUsuario = require('../middlewares/validarUser');


//Rutas usuarios

router.post('/crear', validarUsuario, usuariosController.crearUsuario);
router.get('/', usuariosController.obtenerUsuarios)

module.exports = router;