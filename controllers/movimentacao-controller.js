const mysql = require('../mysql').pool;
const movimentacaoValidator = require('../validators/movimentacoes-validators')


exports.getMovimentacoes = (req, res) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM movimentacoes',
            (error, resultado, fields) => {

                conn.release();

                if(error){return res.status(500).send({error: error})}

                return res.status(200).send({ response: resultado, status: 200})

            }
        )
    })
}

exports.createMovimentacao = (req, res, next) =>{
    if(movimentacaoValidator.movimentacaoValida(req.body.fornecedor, req.body.descricao, req.body.tipo_movimentacao, req.body.preco_custo, req.body.preco_venda)){
        
        mysql.getConnection((error, conn) =>{
            if(error){return res.status(500).send({error: error})}
            conn.query(
                'INSERT INTO movimentacoes (fornecedor, descricao, tipo_movimentacao, preco_custo, preco_venda) VALUES (?, ?, ?, ?,?)',
                [req.body.fornecedor, req.body.descricao, req.body.tipo_movimentacao, req.body.preco_custo, req.body.preco_venda],
                
                (error, resultado, field) => {
    
                    conn.release();
    
                    if(error) {return res.status(500).send({error: error})}
    
                    res.status(201).send({
                        mensagem: 'Movimentação inserida com sucesso',
                        movimentacao: resultado,
                        id_movimentacao: resultado.insertId,
                        status: 201
                    })
                }
            )
        })
    }else{
        return res.status(500).send({error: 'Problemas para cadastrar movimentação, algum campo não está preenchido conforme o esperado'})
    }
}