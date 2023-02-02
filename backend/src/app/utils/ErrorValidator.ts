function validaErro(erro: Error) {
    if (erro.name == 'ValidationError')
        return { status: 400, mensagem: 'Campo obrigatório não foi preenchido' };

    return { status: 500, mensagem: 'Não foi possível cadastrar o funcionário'}
}

export { validaErro };
