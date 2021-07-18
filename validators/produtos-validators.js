const nomeValido = value => {
    let nomeEhValido = value.length < 2 ? false : true
    return nomeEhValido
}
const quanditadeValida = value => {
    let quanditadeEhValida = value <= 0 ? false : true
    return quanditadeEhValida
}
const precoValiido = value => {
    let precoEhValido = value <= 0 ? false : true
    return precoEhValido
}

exports.produtoValidado = (nome, quantidade, preco) =>{
    let produtoEstaValido = nomeValido(nome) && quanditadeValida(quantidade) && precoValiido(preco) ? true : false
    return produtoEstaValido
}