import { funcionarioController } from '../controllers/FuncionarioController';
import { Router } from "express";

const funcionariosRoutes: Router = Router();

funcionariosRoutes.get('/funcionarios', funcionarioController.listagemFuncionarios)
funcionariosRoutes.get('/funcionario/:id', funcionarioController.listaFuncionario)
funcionariosRoutes.get('/funcionario', funcionarioController.listaFuncionario)
funcionariosRoutes.delete('/funcionario/:id', funcionarioController.desativaFuncionario)
funcionariosRoutes.post('/cadastro', funcionarioController.cadastrar)

export default funcionariosRoutes;