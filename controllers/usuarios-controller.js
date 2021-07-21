const mysql = require('../mysql').pool
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidator = require('../validators/user-validators')

exports.cadastroUsuario = (req, res, next) => {

    if(userValidator.usuarioValido(req.body.nome, req.body.email, req.body.senha)){
        mysql.getConnection((err, conn) => {
            if (err) { return res.status(500).send({ error: error }) }
    
            conn.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], (error, results) => {
                if (error) { return res.status(500).send({ error: error }) }
    
                if (results.length > 0) {
                    res.status(401).send({ mensagem: 'Usuário já cadastrado' })
                } else {
    
                    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                        if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
    
                        conn.query(` INSERT INTO usuarios (email, senha, nome) VALUES (?,?,?)`,
                            [req.body.email, hash, req.body.nome],
                            (error, results) => {
                                conn.release();
                                if (error) { return res.status(500).send({ error: error }) }
    
                                let response = {
                                    mensagem: 'Usuário criado com sucesso',
                                    usuarioCriado: {
                                        id_usuario: results.insetId,
                                        email: req.body.email,
                                        nome: req.body.nome
                                    },
                                    status: 201
                                }
    
                                return res.status(201).send(response)
                            }
                        )
    
                    })
                }
            })
    
    
        })
    }else{
        return res.status(500).send({ error: 'Usuário não cadastrado corretamente, verificar campos.' }) 
    }
}

exports.login = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error) {return res.status(500).send({error: error})}

        const query = ` SELECT * FROM usuarios WHERE email = ?`

        conn.query(query, [req.body.email], (error,results, fields)=>{
            conn.release();
            if(error) {return res.status(500).send({error: error})}

            if(results.length < 1){
                return res.status(401).send({mensagem: 'Falha na autenticação'})
            }
            const name = results[0].nome;
            
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) =>{

               if(err){return res.status(401).send({mensagem: 'Falha na autenticação'})}

                if(result){
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    }, 
                   'segredo',
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).send({mensagem: 'Usuário autenticado com sucesso', token: token, nome: name, status: 200})
                }
            })
        })
    })
}