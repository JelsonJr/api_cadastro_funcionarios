function validaErro(erro: Error) {
    if (erro.name == 'ValidationError')
        return { status: 400, mensagem: 'Campo obrigatório não foi preenchido corretamente' };

    if (erro.name == 'TypeError')
        return { status: 400, mensagem: 'Sem parâmetro para a busca' };

    if (erro.name == 'CastError')
        return { status: 400, mensagem: 'ID inválido para busca' };


    return { status: 500, mensagem: 'Não foi possível realizar operação com o funcionário' }
}

export { validaErro };
