import { Request, Response } from "express";
import { Funcionario } from "../models/Funcionario";
import { ValidaCPF } from "../utils/CPFValidator";
import { validaErro } from "../utils/ErrorValidator";
class FuncionarioController {
    public async list(req: Request, res: Response) {
        const funcionarios = await Funcionario.find({ situacao: true });
        if (!funcionarios)
            return res.status(500).json({
                erro: 'Não foi possível fazer a busca dos funcionários',
                success: false
            });

        return res.status(200).json({ funcionarios });
    }

    public async cadastrar(req: Request, res: Response) {
        //validar digitos do cpf
        //validar caso nao venha req.body
        const cpf = ValidaCPF.verificaCPF(req.body.cpf);
        if (cpf.invalido) return res.status(400).json({ erro: cpf.erro, success: false });

        const existeCadastro = await Funcionario.findOne({ cpf: req.body.cpf });
        if (existeCadastro) return res.status(400).json({ erro: 'Funcionário já cadastrado', success: false });

        const funcionario = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            cargo: req.body.cargo,
            salario: req.body.salario >= 0 ? req.body.salario : 0.0,
        }

        try {
            await Funcionario.create(funcionario);
            return res.status(200).json({ msg: 'Funcionário cadastrado com sucesso!', success: true });
        } catch (erro: any) {
            const resposta = validaErro(erro);
            return res.status(resposta.status).json({
                erro: resposta.mensagem,
                success: false
            });
        }
    }

}

export const funcionarioController = new FuncionarioController();
