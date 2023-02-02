import { Router } from "express";
import funcionariosRoutes from "./funcionariosRouter"; 

const router: Router = Router()

router.use(funcionariosRoutes)

export { router };