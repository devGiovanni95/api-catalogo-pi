import { Router } from 'express'
import CategoryController from '../../controllers/category/category.controller'
import AuthMiddLeware from "../../middlewares/auth.middleware";

const categoryRoutes = Router()

categoryRoutes.post('/', /*AuthMiddLeware,*/CategoryController.store)
categoryRoutes.get('/', CategoryController.findAll)
categoryRoutes.get('/:id', CategoryController.findById)
categoryRoutes.delete('/:id', /*AuthMiddLeware,*/ CategoryController.delete)
categoryRoutes.put('/:id', /*AuthMiddLeware,*/ CategoryController.update)
export default categoryRoutes