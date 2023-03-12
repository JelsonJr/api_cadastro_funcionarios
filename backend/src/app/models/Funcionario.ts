import { model, Schema } from "mongoose";
import IFuncionario from "./interfaces/IFuncionario";
import salarioValidator from "./interfaces/ISalario";

const funcionarioSchema = new Schema<IFuncionario>({
    nome: {
        type: String,
        required: true,
        minlength: 3,
    },
    cargo: {
        type: String,
        required: true,
        minlength: 3
    },
    cpf: {
        type: String,
        required: true,
        length: 11
    },
    salario: {
        type: Number,
        required: true,
        validate: salarioValidator
    },
    situacao: {
        type: Boolean,
        default: true
    },
    data_admissao: {
        type: Date,
        default: Date.now
    },
});

export const Funcionario = model<IFuncionario>('Funcionario', funcionarioSchema);
