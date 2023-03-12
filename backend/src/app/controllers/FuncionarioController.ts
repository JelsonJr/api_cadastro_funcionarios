import { Request, Response } from "express";
import { isEmpty } from "lodash";
import { verificaCPF } from "../utils/CPFValidator";
import { validaErro } from "../utils/ErrorValidator";
import { Funcionario } from "../models/Funcionario";
import IFuncionario from '../models/interfaces/IFuncionario';

class FuncionarioController {
    public async cadastrar(req: Request, res: Response) {
        if (isEmpty(req.body)) {
            return res.status(400).json({
                erro: "Requisição sem dados",
                success: false
            });
        }

        if (Object.values(req.body).some((valor) => typeof valor === "string" && !valor.trim().length)) {
            return res.status(400).json({
                erro: "Requisição com campos vazios",
                success: false
            });
        }

        const { nome, cpf, cargo, salario } = req.body;

        if (salario < 0 || !salario) {
            return res.status(400).json({
                erro: "Requisição com campos vazios ou inválidos!",
                success: false
            });
        }

        const cpf_verificado = verificaCPF(cpf);
        if (cpf_verificado.invalido) {
            return res.status(400).json({
                erro: cpf_verificado.erro,
                success: false
            });
        }

        const cpf_sem_formatacao = cpf.replace(/\.|-/g, "");
        const existeCadastro = await Funcionario.findOne({ cpf: cpf_sem_formatacao });

        if (existeCadastro) {
            return res.status(400).json({
                erro: 'Funcionário já cadastrado',
                success: false
            });
        }

        const funcionario = new Funcionario({ nome, cpf: cpf_sem_formatacao, cargo, salario });

        try {
            await funcionario.validate();
            await funcionario.save();

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
        const { limit = 10, skip = 0 } = req.body;
        try {
            const funcionarios = await Funcionario.find({ situacao: true })
                .limit(limit)
                .skip(skip);

            if (funcionarios.length === 0) {
                return res.status(404).json({
                    erro: "Nenhum funcionário encontrado",
                    success: false,
                });
            }

            return res.status(200).json({ funcionarios, success: true });
        } catch (error: any) {
            return res.status(503).json({
                erro: "Não foi possível fazer a busca dos funcionários",
                success: false,
            });
        }
    }

    public async listaFuncionario(req: Request, res: Response) {
        try {
            const { id, cpf } = req.params.id ? req.params : req.body;

            if (id && typeof id !== "string") {
                return res.status(400).json({
                    erro: "ID inválido",
                    success: false,
                });
            }

            if (cpf && (typeof cpf !== "string" || verificaCPF(cpf).invalido)) {
                return res.status(400).json({
                    erro: "CPF inválido",
                    success: false,
                });
            }

            const funcionario = await this.buscarFuncionario(id, cpf);

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

    private async buscarFuncionario(id?: string, cpf?: string) {
        if (id) return await Funcionario.findById(id);

        if (cpf) {
            const cpfSemMascara = cpf.replace(/\.|-/g, "");

            return await Funcionario.findOne({ cpf: cpfSemMascara });
        }
    }

    public async desativaFuncionario(req: Request, res: Response) {
        console.log(req.body.cpf);
    }
}

export const funcionarioController = new FuncionarioController();