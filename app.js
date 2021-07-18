const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const rotaProdutos = require('./routes/produtos');
const rotaUsuarios = require('./routes/usuarios');
const rotaMovimentacao = require('./routes/movimentacoes');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})) //apenas dados simples
app.use(express.json()); //json de entrada no body

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, Access-Control-Allow-Headers, Authorization, X-Requested-With'); 

        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
           app.use(cors());
          //  return res.status(200).sendStatus({}) problema nesse retorno aqui, validar    
        }
        next();
})


app.use('/produtos', rotaProdutos)
app.use('/usuarios',rotaUsuarios)
app.use('/movimentacao', rotaMovimentacao)


app.use((req, res, next) =>{
    const erro = new Error('Não foi encontrado resultado');
    erro.status = 404;
    next(erro)
});
app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
})

module.exports = app;