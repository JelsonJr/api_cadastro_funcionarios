import { Request, Response } from "express";
import { Funcionario } from "../models/Funcionario";
import { verificaCPF } from "../utils/CPFValidator";
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
        const cpf_verificado = verificaCPF(req.body.cpf);
        if (cpf_verificado.invalido) return res.status(400).json({ erro: cpf_verificado.erro, success: false });

        const cpf = req.body.cpf.replace(/\.|-/g, "");
        const existeCadastro = await Funcionario.findOne({ cpf });
        
        if (existeCadastro) return res.status(400).json({ erro: 'Funcionário já cadastrado', success: false });

        const funcionario = {
            nome: req.body.nome,
            cpf: cpf,
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
