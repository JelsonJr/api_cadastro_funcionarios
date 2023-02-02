import { Double } from "mongodb";

interface IFuncionario {
    nome: String;
    cargo: String;
    cpf: String;
    salario: Double;
    situacao?: Boolean;
    data_admissao?: Date;
}

export default IFuncionario;
