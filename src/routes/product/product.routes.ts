import { Router } from 'express'
import ProductController from '../../controllers/product/product.controller'
import multer from 'multer'
// import { storage } from './../../config/multerConfig'
import AuthMiddLeware from '../../middlewares/auth.middleware'

// const upload = multer({storage:storage})
const productRoutes = Router()

productRoutes.post('/', AuthMiddLeware, ProductController.store)
productRoutes.get('/', ProductController.findAll)
productRoutes.get('/:id', ProductController.findById)
productRoutes.get('/category/:category', ProductController.findByCategory)
productRoutes.delete('/:id', AuthMiddLeware, ProductController.delete)
productRoutes.put('/:id', AuthMiddLeware, ProductController.update)

export default productRoutes