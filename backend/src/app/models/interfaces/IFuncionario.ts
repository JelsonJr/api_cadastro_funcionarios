interface IFuncionario {
    nome: String;
    cargo: String;
    cpf: String;
    salario: Number;
    situacao?: Boolean;
    data_admissao?: Date;
}

export default IFuncionario;
