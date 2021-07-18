const express = require('express');
const router = express.Router();
const login = require('../middlewares/login')

const movimentacoesController = require('../controllers/movimentacao-controller');

router.get('/', movimentacoesController.getMovimentacoes)

router.post('/', login.obrigatorio, movimentacoesController.createMovimentacao);

module.exports = router