function verificaCPF(cpf: string) {
    let mensagem = 'CPF inválido!';

    if (!ehUmCPF(cpf))
        return { erro: `${mensagem} Número de caracteres inválidos!`, invalido: true };

    if (validaNumerosRepetidos(cpf))
        return { erro: `${mensagem} Não existe CPF com números repetidos!`, invalido: true };

    if (validaPrimeiroDigito(cpf) && validaSegundoDigito(cpf))
        return { erro: mensagem, invalido: true };

    return { mensagem: 'CPF válido!', invalido: false };
}

function validaPrimeiroDigito(cpf: string): Boolean {
    const cpf_numeros = (cpf.replace(/\.|-/g, ""));

    let soma = 0;
    let multiplicador = 10;

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += parseInt(cpf_numeros[tamanho]) * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) soma = 0;

    return soma != parseInt(cpf_numeros[9]);
}

function validaSegundoDigito(cpf: string): Boolean {
    const cpf_numeros = (cpf.replace(/\.|-/g, ""));

    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += parseInt(cpf_numeros[tamanho]) * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) soma = 0;

    return soma != parseInt(cpf_numeros[10]);
}

function ehUmCPF(cpf: string): Boolean {
    const valido = cpf.replace(/\.|-/g, "");
    if (valido.length !== 11) return false;

    return true;
}

function validaNumerosRepetidos(cpf: string): Boolean {
    const cpf_numeros = cpf.replace(/\.|-/g, "");
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf_numeros);
}

export { verificaCPF };
