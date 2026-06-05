const { Router } = require('express')
const router = Router()
const usuariosController = require('../controllers/usuarios.controller');
const {validarUser} = require('../middlewares/validarUser');
const { validate } = require('../middlewares/validar');
const loginRules = require('../middlewares/validarLogin');


//Rutas usuarios

router.post('/crear', validarUser, validate, usuariosController.crearUser);
router.get('/email', usuariosController.obtenerUserByEmail)
router.get('/:id', usuariosController.obtenerUserById)
router.post('/login', usuariosController.loginUser)

module.exports = router;