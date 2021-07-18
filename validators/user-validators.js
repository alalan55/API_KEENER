const nomeValido = (value) =>{
    let nomeEhValido = value.length > 3 ? true : false
    return nomeEhValido
}
const emailValido = (value) =>{
    return true
    
}
const senhaValida = (value) =>{
    let senhaEhValida = false;

    let regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/; //Necessário ter 8 caracteres ou mais e um caracter especial
    let senhaMinimoOitoCaracteres = value.length > 8 ? true : false

    if(senhaMinimoOitoCaracteres){
        senhaEhValida = regex.test(String(value))
    }
    return senhaEhValida
}

exports.usuarioValido = (nome, email, senha) =>{
    let userValido = nomeValido(nome) && emailValido(email) && senhaValida(senha) ? true : false
    return userValido
}

