import { Router } from 'express'
import OrderController from '../../controllers/order/order.controller'
import AuthMiddLeware from '../../middlewares/auth.middleware'

const orderRoutes = Router()

orderRoutes.post('/', OrderController.store)
orderRoutes.get('/', OrderController.findAll)
orderRoutes.get('/user/:userId', OrderController.findAllByUser)
orderRoutes.get('/:id', OrderController.findById)
orderRoutes.put('/:id', OrderController.update)
orderRoutes.delete('/:id', OrderController.delete)

export default orderRoutes