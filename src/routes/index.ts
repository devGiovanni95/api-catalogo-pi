import { Router, response } from "express";
import categoryRoutes from "./category/category.routes";
import productRoutes from "./product/product.routes";
import userRoutes from "./user/user.routes";
import authRoutes from './authentication/authenticatio.routes';
import AuthMiddLeware from "../middlewares/auth.middleware";
import swaggagerUi from 'swagger-ui-express'
import swaggerDocs from './../documentation/swagger.json'
import photoRoutes from "./photo/photos.routes";
import multer from "multer";


import {  Request, Response, RouterOptions } from 'express'
// import CategoryController from '../../controllers/category/category.controller'
// import AuthMiddLeware from "../../middlewares/auth.middleware";




const routes = Router();

routes.use('/category', categoryRoutes)
routes.use('/product', productRoutes)
routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/', photoRoutes)
routes.use('/', photoRoutes)
// routes.post('/upload', multer(multerConfig).single('file'), (request: Request, response:Response) => {
//     console.log(request.file)
//     return response.json({message: 'helo'})
//  })

//rota para ver a documentação da api em swagger docs
routes.use('/api-docs', swaggagerUi.serve, swaggagerUi.setup(swaggerDocs))
//rota do swagger 
routes.get('/swagger', (request, response) => {
    return response.sendFile(process.cwd() + "/src/documentation/swagger.json")
})

routes.get('/docs', (request, response) => {
    return response.sendFile(process.cwd() + "/index.html")
})

export default routes