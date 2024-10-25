import { Router } from 'express'
import ProductController from '../../controllers/product/product.controller'
import AuthMiddLeware from '../../middlewares/auth.middleware'

const productRoutes = Router()
productRoutes.post('/', /*AuthMiddLeware,*/ ProductController.store)
productRoutes.get('/', ProductController.findAll)
productRoutes.get('/:id', ProductController.findById)
productRoutes.get('/category/:category', ProductController.findByCategory)
productRoutes.delete('/:id', /*AuthMiddLeware,*/ ProductController.delete)
productRoutes.put('/:id', /*AuthMiddLeware,*/ ProductController.update)
productRoutes.get('/categoryproduct/:id', ProductController.findProductByIdWithCategory)

export default productRoutes