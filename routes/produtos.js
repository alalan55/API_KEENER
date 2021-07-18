const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middlewares/login')

const produtosController = require('../controllers/produtos-controller')

router.get('/',produtosController.getProdutos)

//INSERE NOVO PRODUTO
router.post('/', login.obrigatorio, produtosController.createProdutos )

router.get('/:id', (req, res)=>{
    mysql.getConnection((error, conn) =>{
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?',
            [req.params.id],
            (error, resultado, fields) =>{
                if(error) {return res.status(500).send({error: error})}

                res.status(200).send({
                    mensagem: resultado
                })
            }
        )

    })
})

router.patch('/:id',produtosController.findProduto )


router.delete('/', login.obrigatorio,produtosController.deleteProduto )


module.exports = router