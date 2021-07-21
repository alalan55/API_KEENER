const fornecedor = (value) =>{
    let fornecedorValido = value.length > 2 && value.length < 50 ? true : false
    return fornecedorValido
}
const descricao = (value) =>{
    let descricaoValida = value.length > 2 && value.length < 100 ? true : false
    return descricaoValida
}
const tipoMovimentacao = (value) =>{
    let movimentacaoValida = value == 0 || value == 1 ? true : false
    return movimentacaoValida
}

exports.movimentacaoValida = (fornec, desc, tipoMov) =>{
    let movimentacaoEhValida = fornecedor(fornec) && descricao(desc) && tipoMovimentacao(tipoMov) ? true : false
    return movimentacaoEhValida
}
