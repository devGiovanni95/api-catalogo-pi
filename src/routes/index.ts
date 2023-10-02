import { Router, response } from "express";
import categoryRoutes from "./category/category.routes";
import productRoutes from "./product/product.routes";
import userRoutes from "./user/user.routes";
import authRoutes from './authentication/authenticatio.routes';
import AuthMiddLeware from "../middlewares/auth.middleware";
import swaggagerUi from 'swagger-ui-express'
import swaggerDocs from './../documentation/swagger.json'

const routes = Router();

routes.use('/category', categoryRoutes)
routes.use('/product', productRoutes)
routes.use('/user', AuthMiddLeware, userRoutes)
routes.use('/auth', authRoutes)

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