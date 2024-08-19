import { Router, response } from "express";
import categoryRoutes from "./category/category.routes";
import productRoutes from "./product/product.routes";
import userRoutes from "./user/user.routes";
import authRoutes from './authentication/authenticatio.routes';
import swaggagerUi from 'swagger-ui-express'
import swaggerDocs from './../documentation/swagger.json'
import productPhotoRoutes from "./product/product.photo.routes";
import orderRoutes from "./order/order.routes";
// import photoRoutes from "./photo/photos.routes";

const routes = Router();

routes.use('/category', categoryRoutes)
routes.use('/product', productRoutes)
routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/order', orderRoutes)
routes.use('/photo', productPhotoRoutes)


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