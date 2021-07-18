const jwt = require('jsonwebtoken')

exports.obrigatorio = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
         const decode = jwt.verify(token, 'segredo'); // aqui tenho que ver o lance da variavel de ambiente tambem
         req.usuario = decode;
        next();
        
    } catch (error) {
            return res.status(401).send({mensagem: 'Falha na autenticação do token'})
    }

}

exports.opcional = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
         const decode = jwt.verify(token, 'segredo'); // aqui tenho que ver o lance da variavel de ambiente tambem
         req.usuario = decode;
        next();
        
    } catch (error) {
            next();
    }

}