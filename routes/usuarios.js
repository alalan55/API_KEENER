const express = require('express')
const router = express.Router();


const userController = require('../controllers/usuarios-controller')

router.post('/cadastro', userController.cadastroUsuario)

router.post('/login', userController.login)


module.exports = router
