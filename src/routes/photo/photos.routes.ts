import { Router, Request, Response, RouterOptions } from 'express'
import { response } from 'express';
import multer from 'multer';
import { storage } from '../../config/multerConfig';
import PhotosController from '../../controllers/photo/photo.controller';

const upload = multer({storage:storage})
const photoRoutes = Router()

 photoRoutes.post('/upload', upload.single("imagem"),(req, res) =>{
   return  res.json(req.file)
  })

  photoRoutes.post('/photo', PhotosController.store)
  photoRoutes.get('/photo', PhotosController.findAll)
  photoRoutes.get('/photo/:id', PhotosController.findById)
  photoRoutes.put('/photo/:id', PhotosController.update)
  photoRoutes.delete('/photo/:id', PhotosController.delete)
  photoRoutes.get('/photo/product/:product', PhotosController.findByProduct)
 export default photoRoutes
