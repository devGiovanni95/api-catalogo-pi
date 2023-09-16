import { Router } from 'express'
import ProductController from '../../controllers/product/product.controller'

const productRoutes = Router()

productRoutes.post('/', ProductController.store)
productRoutes.get('/', ProductController.findAll)
productRoutes.get('/:id', ProductController.findById)
productRoutes.delete('/:id', ProductController.delete)
productRoutes.put('/:id', ProductController.update)

export default productRoutes