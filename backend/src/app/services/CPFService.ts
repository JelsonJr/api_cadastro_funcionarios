class CPFService {

    public verificaCPF(cpf: string) {
        let mensagem = 'CPF inválido!'
        if (!this.ehUmCPF(cpf)) return { erro: `${mensagem} Número de caracteres inválidos!`, invalido: true };

        if (this.validaNumerosRepetidos(cpf)) return { erro: `${mensagem} Não existe CPF com números repetidos!`, invalido: true };

    }

    private ehUmCPF(cpf: string): Boolean {
        const valido = cpf.replace(/\.|-/g, "");
        if (valido.length !== 11) return false;

        return true;
    }

    private validaNumerosRepetidos(cpf: string): Boolean {
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

        return numerosRepetidos.includes(cpf);
    }

    private validaPrimeiroDigito(cpf: string): Boolean {
        return false;
    }
}

export const ValidaCPF = new CPFService();