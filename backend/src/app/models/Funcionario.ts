import { model, Schema } from "mongoose";
import IFuncionario from "./interfaces/IFuncionario";

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
