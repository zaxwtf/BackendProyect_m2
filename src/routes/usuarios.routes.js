const { Router } = require('express')
const router = Router()
const usuariosController = require('../controllers/usuarios.controller');
const validarUsuario = require('../middlewares/validarUser');
const validate = require('../middlewares/validar')


//Rutas usuarios

router.post('/crear', validate.validarUser, validate.validate, usuariosController.crearUser);
router.get('/email', usuariosController.obtenerUserByEmail)
router.get('/:id', usuariosController.obtenerUserById)

module.exports = router;