class CPFValidator {

    public verificaCPF(cpf: string) {
        let mensagem = 'CPF inválido!';

        if (!this.ehUmCPF(cpf))
            return { erro: `${mensagem} Número de caracteres inválidos!`, invalido: true };

        if (this.validaNumerosRepetidos(cpf))
            return { erro: `${mensagem} Não existe CPF com números repetidos!`, invalido: true };

        if (this.validaPrimeiroDigito(cpf) && this.validaSegundoDigito(cpf)) 
            return { erro: mensagem, invalido: true };

        return { mensagem: 'CPF válido!', invalido: false };
    }

    private validaPrimeiroDigito(cpf: string): Boolean {
        // const cpf_numeros: Number = parseInt(cpf.replace(/\.|-/g, ""));
        
        // let soma = 0;
        // let multiplicador = 10;
    
        // for (let tamanho = 0; tamanho < 9; tamanho++) {
        //     soma += cpf_numeros[tamanho] * multiplicador;
        //     multiplicador--
        // }
        
        return false;
    }

    private validaSegundoDigito(cpf: string): Boolean {
        return false;
    }

    private ehUmCPF(cpf: string): Boolean {
        const valido = cpf.replace(/\.|-/g, "");
        if (valido.length !== 11) return false;

        return true;
    }

    private validaNumerosRepetidos(cpf: string): Boolean {
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
}

export const ValidaCPF = new CPFValidator();
