const { Router } = require('express')
const router = Router()
const usuariosController = require('../controllers/usuarios.controller');
const validarUsuario = require('../middlewares/validarUser');


//Rutas usuarios

router.post('/crear', usuariosController.crearUser);
router.get('/:id', usuariosController.obtenerUserById)
router.get('/email', usuariosController.obtenerUserByEmail)

module.exports = router;