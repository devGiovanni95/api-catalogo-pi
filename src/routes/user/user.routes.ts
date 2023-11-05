import { Router } from 'express'
import UserController from '../../controllers/user/user.controller'
import AuthMiddLeware from '../../middlewares/auth.middleware'

const userRoutes = Router()

userRoutes.post('/', /*AuthMiddLeware,*/ UserController.store)
userRoutes.get('/', /*AuthMiddLeware,*/UserController.findAll)
userRoutes.get('/:id', /*AuthMiddLeware,*/UserController.findById)
userRoutes.delete('/:id', /*AuthMiddLeware,*/UserController.delete)
userRoutes.put('/:id', /*AuthMiddLeware,*/UserController.update)

export default userRoutes