import { Router } from "express";
import { funcionarioController } from "../app/controllers/FuncionarioController";

const router: Router = Router()
router.get("/", funcionarioController.list);

export { router };