import { Router } from "express";
import categoryRoutes from "./category/category.routes";
import productRoutes from "./product/product.routes";
import userRoutes from "./user/user.routes";
import authRoutes from './authentication/authenticatio.routes';
import AuthMiddLeware from "../middlewares/auth.middleware";

const routes = Router();

routes.use('/category', AuthMiddLeware, categoryRoutes)
routes.use('/product', AuthMiddLeware, productRoutes)
routes.use('/user', AuthMiddLeware, userRoutes)
routes.use('/auth', authRoutes)

export default routes