import { Router } from 'express'
import ProductController from '../../controllers/product/product.controller'
import multer from 'multer'
import { storage } from './../../config/multerConfig'

const upload = multer({storage:storage})
const productRoutes = Router()

productRoutes.post('/', ProductController.store)
productRoutes.get('/', ProductController.findAll)
productRoutes.get('/:id', ProductController.findById)
productRoutes.delete('/:id', ProductController.delete)
productRoutes.put('/:id', ProductController.update)


// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
productRoutes.post('/upload', upload.single("file"),(req, res) =>{return res.json(req.file?.filename)})

export default productRoutes