import { model, Schema } from "mongoose";
import IFuncionario from "./interfaces/IFuncionario";

const funcionarioSchema = new Schema<IFuncionario>({
    nome: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    salario: {
        type: Number,
        required: true
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
