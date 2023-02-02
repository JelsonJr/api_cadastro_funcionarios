import { funcionarioController } from './../app/controllers/FuncionarioController';
import { Router } from "express";

const funcionariosRoutes: Router = Router();

funcionariosRoutes.get('/funcionarios', funcionarioController.list)
funcionariosRoutes.post('/cadastro', funcionarioController.cadastrar)

export default funcionariosRoutes;