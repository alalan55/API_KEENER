const mysql = require('../mysql').pool;
const movimentacaoValidator = require('../validators/movimentacoes-validators')


exports.getMovimentacoes = (req, res) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
           `SELECT p.id_produtos, p.nome, p.quantidade, p.preco, m.descricao, m.fornecedor, m.tipo_movimentacao, m.id_movimentacao
           FROM produtos as p
           INNER JOIN movimentacoes AS m
           ON p.id_produtos = m.id_produto;`,
            (error, resultado, fields) => {

                conn.release();

                if(error){return res.status(500).send({error: error})}

                return res.status(200).send({ response: resultado, status: 200})

            }
        )
    })
}

exports.createMovimentacao = (req, res, next) =>{
    if(movimentacaoValidator.movimentacaoValida(req.body.fornecedor, req.body.descricao, req.body.tipo_movimentacao)){
        
        mysql.getConnection((error, conn) =>{

            if(error){return res.status(500).send({error: error})}

            conn.query('SELECT * FROM produtos WHERE id_produtos = ?',[req.body.id_produto], (error, results) =>{

                if (error) { return res.status(500).send({ error: error, message: 'Movimentação não encontrada na consulta' }) }

                if(results.length > 0){

                    conn.query(
                        'INSERT INTO movimentacoes (fornecedor, descricao, tipo_movimentacao, quantidade, id_produto) VALUES (?, ?, ?, ?, ?)',
                        [req.body.fornecedor, req.body.descricao, req.body.tipo_movimentacao, req.body.quantidade, req.body.id_produto],
                        
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
                }else{
                    conn.release();
                    res.status(404).send({mensagem: 'O produto usado no cadastro de movimentação, não está registrado na base de dados'})
                }
            })

        })
    }else{
        return res.status(500).send({error: 'Problemas para cadastrar movimentação, algum campo não está preenchido conforme o esperado'})
    }
}