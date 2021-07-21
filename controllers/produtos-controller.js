const mysql = require('../mysql').pool;
const produtoValidators = require('../validators/produtos-validators')

exports.getProdutos = (req, res)=>{
    mysql.getConnection((error, conn) =>{
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos',
            (error, resultado, fields) =>{
                conn.release()
                if(error) {return res.status(500).send({error: error})}

                return res.status(200).send({ response: resultado,  status: 200})

            }
        )

    })
}

exports.createProdutos = (req, res, next)=>{

    if(produtoValidators.produtoValidado(req.body.nome, req.body.quantidade,req.body.preco)){
        mysql.getConnection((error, conn) =>{
            if(error) {return res.status(500).send({error: error})}
            conn.query(
                'INSERT INTO produtos (nome, preco, quantidade) VALUES (?,?,?)',
                [req.body.nome, req.body.preco, req.body.quantidade],
    
                (error, resultado, field) => {
                    conn.release();
                    
                   if(error) {return res.status(500).send({error: error, message: 'Problemas para inserir o produto na base de dados'})}
    
                    res.status(201).send({
                        mensagem: 'Produto Inserido com sucesso',
                        produto: resultado,
                        id_produto: resultado.insertId,
                        status: 201
                    })
                }
            )
        })
    }else{
       return res.status(500).send({error: 'Falha ao cadastrar produto, algum campo não foi preenchido conforme esperado'})
    }
}
exports.findProduto = (req, res)=>{
    mysql.getConnection((error, conn) =>{
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `UPDATE produtos
                SET nome = ?
                    preco = ?
                WHERE id_produtos = ?
            `,
            [req.body.nome, req.body.preco, req.body.id_produtos],
            (error, resultado, fields) =>{
                conn.release()
                if(error) {return res.status(500).send({error: error})}

                return res.status(202).send({ response: 'Produto atualizado com sucesso'})
            }
        )

    })
}

exports.deleteProduto = (req, res)=>{
    mysql.getConnection((error, conn) =>{
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'DELETE from produtos WHERE id_produtos = ?', [req.body.id],
            (error, resultado, fields) =>{
                if(error) {return res.status(500).send({error: error})}

                res.status(202).send({
                    mensagem: 'Produto apagado'
                })
            }
        )

    })
}