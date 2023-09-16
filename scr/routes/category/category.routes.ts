import { Router } from 'express'
import CategoryController from '../../controllers/category/category.controller'

const categoryRoutes = Router()

categoryRoutes.post('/', CategoryController.store)
categoryRoutes.get('/', CategoryController.findAll)
categoryRoutes.get('/:id', CategoryController.findById)
categoryRoutes.delete('/:id', CategoryController.delete)
categoryRoutes.put('/:id',CategoryController.update)
export default categoryRoutes