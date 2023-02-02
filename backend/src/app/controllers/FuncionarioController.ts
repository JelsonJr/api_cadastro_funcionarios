import { Request, Response } from "express";

class FuncionarioController {

    public list(req: Request, res: Response) {
        return res.json({ msg: 'Olá mundo' });
    }

}

export const funcionarioController = new FuncionarioController();