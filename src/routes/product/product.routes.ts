import { Router } from 'express'
import ProductController from '../../controllers/product/product.controller'
import multer from 'multer'
import { storage } from './../../config/multerConfig'
import AuthMiddLeware from '../../middlewares/auth.middleware'

const upload = multer({storage:storage})
const productRoutes = Router()

productRoutes.post('/', AuthMiddLeware, ProductController.store)
productRoutes.get('/', ProductController.findAll)
productRoutes.get('/:id', ProductController.findById)
productRoutes.delete('/:id', AuthMiddLeware, ProductController.delete)
productRoutes.put('/:id', AuthMiddLeware, ProductController.update)


// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
productRoutes.post('/upload', AuthMiddLeware, upload.single("file"),(req, res) =>{return res.json(req.file?.filename)})

export default productRoutes