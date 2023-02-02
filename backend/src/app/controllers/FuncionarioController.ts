import { Request, Response } from "express";
import { Funcionario } from "../models/Funcionario";
import { ValidaCPF } from "../services/CPFService";
class FuncionarioController {

    public list(req: Request, res: Response) {
        return res.json({ msg: 'Olá mundo' });
    }

    public async cadastrar(req: Request, res: Response) {
        const cpf = ValidaCPF.verificaCPF(req.body.cpf);
        if (cpf?.invalido) return res.status(400).json({ erro: cpf.erro, success: false });

        const existeCadastro = await Funcionario.findOne({ nome: req.body.nome, cpf: req.body.cpf });
        if (existeCadastro) return res.status(400).json({ erro: 'Funcionário já cadastrado', success: false });

        const funcionario = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            cargo: req.body.cargo,
            salario: req.body.salario >= 0 ? req.body.salario : 0.0,
        }

        const dataSave = await Funcionario.create(funcionario);
        if (!dataSave)
            return res
                .status(500)
                .json({ erro: `Não foi possível cadastrar o funcionário ${funcionario.nome}`, success: false });

        return res.status(200).json({ msg: 'Funcionário cadastrado com sucesso!', success: true });
    }

}
