import { Router } from "express";
import categoryRoutes from "./category/category.routes";
import productRoutes from "./product/product.routes";
import userRoutes from "./user/user.routes";

const routes = Router();

routes.use('/category', categoryRoutes)
routes.use('/product', productRoutes)
routes.use('/user', userRoutes)

export default routes