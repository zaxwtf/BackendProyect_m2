const { Router } = require('express')
const router = Router()
const usuariosController = require('../controllers/usuarios.controller');
const {validarUser} = require('../middlewares/validarUser');
const { validate } = require('../middlewares/validar');
const { verifyToken } = require('../middlewares/verificarToken');



//Rutas usuarios

router.post('/crear', validarUser, validate, usuariosController.crearUser);
router.get('/email', usuariosController.obtenerUserByEmail)
router.get('/profile', verifyToken, usuariosController.getProfile)
router.post('/login', usuariosController.loginUser)
router.get('/:id', usuariosController.obtenerUserById)



module.exports = router;