import { Request, Response } from "express";
import { Funcionario } from "../models/Funcionario";
import { verificaCPF } from "../utils/CPFValidator";
import { validaErro } from "../utils/ErrorValidator";
import IFuncionario from '../models/interfaces/IFuncionario';

class FuncionarioController {

    public async cadastrar(req: Request, res: Response) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                erro: "Requisição sem dados",
                success: false
            });
        }

        const cpf_verificado = verificaCPF(req.body.cpf);
        if (cpf_verificado.invalido) return res.status(400).json({ erro: cpf_verificado.erro, success: false });

        const cpf = req.body.cpf.replace(/\.|-/g, "");
        const existeCadastro = await Funcionario.findOne({ cpf });

        if (existeCadastro)
            return res.status(400).json({
                erro: 'Funcionário já cadastrado',
                success: false
            });

        const funcionario = {
            nome: req.body.nome,
            cpf: cpf,
            cargo: req.body.cargo,
            salario: req.body.salario >= 0 ? req.body.salario : 0.0,
        }

        try {
            await Funcionario.create(funcionario);

            return res.status(200).json({
                msg: 'Funcionário cadastrado com sucesso!',
                success: true,
            });
        } catch (erro: any) {
            const resposta = validaErro(erro);
            return res.status(resposta.status).json({
                erro: resposta.mensagem,
                success: false,
            });
        }
    }

    public async listagemFuncionarios(req: Request, res: Response) {
        const funcionarios = await Funcionario.find({ situacao: true })
            .limit(req.body.limit || 10)
            .skip(req.body.skip || 0);

        if (!funcionarios || funcionarios === null)
            return res.status(500).json({
                erro: 'Não foi possível fazer a busca dos funcionários',
                success: false
            });

        return res.status(200).json({ funcionarios, success: true });
    }

    public async listaFuncionario(req: Request, res: Response) {
        let funcionario: IFuncionario | null;

        try {
            if (req.params.id) {
                funcionario = await Funcionario.findOne({ _id: req.params.id });
            } else {
                const cpf_verificado = verificaCPF(req.body.cpf);
                if (cpf_verificado.invalido)
                    return res.status(400).json({
                        erro: cpf_verificado.erro,
                        success: false,
                    });

                funcionario = await Funcionario.findOne({ cpf: req.body.cpf.replace(/\.|-/g, "") });
            }

            if (funcionario === null)
                return res.status(404).json({
                    erro: "Funcionário não encontrado",
                    success: false,
                });

            return res.status(200).json({ funcionario, success: true });
        } catch (erro: any) {
            const resposta = validaErro(erro);
            return res.status(resposta.status).json({
                erro: resposta.mensagem,
                success: false,
            });
        }
    }

    public async desativaFuncionario(req: Request, res: Response) {
        console.log(req.body.cpf);
    }
}

export const funcionarioController = new FuncionarioController();
